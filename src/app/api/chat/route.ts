import { ChatOpenAI } from "@langchain/openai";
import { LangChainStream, OpenAIStream, StreamingTextResponse } from "ai";
import { ChatCompletionMessageParam } from "ai/prompts";
import { ChatPromptTemplate, PromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { getVectorStore } from "@/lib/astradb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages;
    const currentMessageContent = messages[messages.length - 1].content;

    const { stream, handlers } = LangChainStream();

    const chatModel = new ChatOpenAI({
      modelName: "gpt-3.5-turbo",
      streaming: true,
      callbacks: [handlers],
      verbose: true,
    });

    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        "You're a chatbot for a personal porfolio site. Impersonate the website owner." +
          "Answer the user's questions based on the context below. " +
          "When nexessary, provide links to the pages with information on the topic from the given context" +
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
        "Page URL: {url}\n\nPage content:\n{page_content}",
      ),
      documentSeparator: "\n--------\n",
    });

    const retriever = (await getVectorStore()).asRetriever(4);
    const retrieverChain = await createRetrievalChain({
      combineDocsChain,
      retriever,
    });
    retrieverChain.invoke({ input: currentMessageContent });
  } catch (error) {}
}
