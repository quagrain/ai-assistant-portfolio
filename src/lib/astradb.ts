import { AstraDB } from "@datastax/astra-db-ts";
import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";
import { OpenAIEmbeddings } from "@langchain/openai";

const endpoint = process.env.ASTRA_DB_ENDPOINT || "";
const collection = process.env.ASTRA_DB_COLLECTION || "";
const token = process.env.ASTRA_DB_APPLICATION_TOKEN || "";

if (!endpoint || !collection || !token) {
  throw new Error(
    "Please set the ASTRA_DB_ENDPOINT, ASTRA_DB_COLLECTION, ASTRA_DB_APPLICATION_TOKEN env variables",
  );
}

export async function getVectorStore() {
  return AstraDBVectorStore.fromExistingIndex(
    new OpenAIEmbeddings({ modelName: "text-embedding-3-small" }),
    {
      token,
      endpoint,
      collectionOptions: { vector: { dimension: 1536, metric: "cosine" } },
    },
  );
}

export async function getEmbeddingsCollection() {
  return new AstraDB(token, endpoint).collection(collection);
}
