import { getVectorStore } from "@/lib/astradb";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
  PromptTemplate,
} from "@langchain/core/prompts";
import { ChatOllama } from "@langchain/ollama";
import { Message as VercelChatMessage, LangChainAdapter, streamText } from "ai";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { createRetrievalChain } from "langchain/chains/retrieval";

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

    // const { stream, handlers } = streamText();

    const chatModel = new ChatOllama({
      model: "llama3.2",
      streaming: true,
      // callbacks: [handlers],
      verbose: true,
    });

    const stream = await chatModel.stream(currentMessageContent);

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
      llm: chatModel,
      retriever,
      rephrasePrompt,
    });

    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        "You're a chatbot for a personal porfolio site. Impersonate the website owner." +
          "Answer the user's questions based on the context below. " +
          "When necessary, provide links to the pages with information on the topic from the given context" +
          "Format your messages in markdown.\n\n" +
          "Context:\n{context}",
      ],
      ["user", "{input}"],
    ]);

    const chain = prompt.pipe(chatModel);
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
      retriever,
    });

    retrievalChain.invoke({ input: currentMessageContent });

    return LangChainAdapter.toDataStreamResponse(stream);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
