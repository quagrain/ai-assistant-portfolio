import { Db, DataAPIClient } from "@datastax/astra-db-ts";
import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";
import { OllamaEmbeddings } from "@langchain/ollama";

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
    new OllamaEmbeddings({
      model: "mxbai-embed-large",
      baseUrl: "http://localhost:11434",
    }),
    {
      token,
      endpoint,
      collection,
      collectionOptions: { vector: { dimension: 1024 } },
    },
  );
}

export async function getEmbeddingsCollection() {
  const client = new DataAPIClient(token);
  const database = client.db(endpoint);

  return database.collection(collection);
}
