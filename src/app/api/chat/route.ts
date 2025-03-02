import { ChatOpenAI } from "@langchain/openai";
import { LangChainStream, OpenAIStream, StreamingTextResponse } from "ai";
import { ChatCompletionMessageParam } from "ai/prompts";
import { ChatPromptTemplate } from "@langchain/core/prompts";

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
    });

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", "Answer questions sarcastically"],
      ["user", "{input}"],
    ]);

    const chain = prompt.pipe(chatModel);
    chain.invoke({ input: currentMessageContent });
  } catch (error) {}
}
