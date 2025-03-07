import {getVectorStore} from "@/lib/astradb";
import {AIMessage, HumanMessage} from "@langchain/core/messages";
import {ChatPromptTemplate, MessagesPlaceholder, PromptTemplate,} from "@langchain/core/prompts";
import {ChatOllama} from "@langchain/ollama";
import {LangChainAdapter, Message as VercelChatMessage} from "ai";
import {createStuffDocumentsChain} from "langchain/chains/combine_documents";
import {createHistoryAwareRetriever} from "langchain/chains/history_aware_retriever";
import {createRetrievalChain} from "langchain/chains/retrieval";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages;

    const chatHistory = messages
      .slice(0, -1)
      .map((m: VercelChatMessage) =>
        m.role === "user"
          ? new HumanMessage(m.content)
          : new AIMessage(m.content)
      );

    const currentMessageContent = messages[messages.length - 1].content;

    const chatModel = new ChatOllama({
      model: "llama3.2",
      streaming: true,
      verbose: true,
      cache: true,
    });

    const rephrasingModel = new ChatOllama({
      model: "llama3.2",
      verbose: true,
      cache: true,
    });

    const rephrasePrompt = ChatPromptTemplate.fromMessages([
      new MessagesPlaceholder("chat_history"),
      ["user", "{input}"],
      [
        "user",
        "Given the above conversation, generate a search query to look up to get information relevant to the current question. " +
        "Don't leave out any relevant keywords. Only return the query and no other text.",
      ],
    ]);

    const retriever = (await getVectorStore()).asRetriever();

    const historyWhereRetrievalChain = await createHistoryAwareRetriever({
      llm: rephrasingModel,
      retriever,
      rephrasePrompt,
    });

    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        "You're a chatbot for a personal porfolio site. Impersonate the website owner." +
        "Answer the user's questions based ONLY on the context below. " +
        "When necessary, provide links to the pages (pages that exists ONLY) with information on the topic using the given context." +
        "If the user asks a question about the website owner that you cannot find, provide a link to the socials page encouraging them to reach out to the owner (who is a nice person)" +
        "NEVER ask the user to click on the bot icon. CAPICHE?!" +
        "Format your messages in markdown.\n\n" +
        "Context:\n{context}",
      ],
      new MessagesPlaceholder("chat_history"),
      ["user", "{input}"],
    ]);

    const combineDocsChain = await createStuffDocumentsChain({
      llm: chatModel,
      prompt,
      documentPrompt: PromptTemplate.fromTemplate(
        "Page URL: {url}\n\nPage content:\n{page_content}"
      ),
      documentSeparator: "\n--------\n",
    });

    const retrievalChain = await createRetrievalChain({
      combineDocsChain,
      retriever: historyWhereRetrievalChain,
    });

    const response = await retrievalChain.stream({
      input: currentMessageContent,
      chat_history: chatHistory,
    });

    // Create a transformed stream that extracts just the answer part
    const transformedStream = response.pipeThrough(
      new TransformStream({
        transform(chunk, controller) {
          // For streamed responses, we need to check what property contains the actual content
          if (chunk.answer) {
            controller.enqueue(chunk.answer);
          } else if (chunk.content) {
            controller.enqueue(chunk.content);
          }
        },
      })
    );

    return LangChainAdapter.toDataStreamResponse(transformedStream);
  } catch (error) {
    console.error(error);
    return Response.json({error: "Internal server error"}, {status: 500});
  }
}
