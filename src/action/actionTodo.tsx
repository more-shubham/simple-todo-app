"use server";

import clientPromise from "@/lib/mongodb";
import { auth } from "@clerk/nextjs/server";

type ITodo = {
    id: string,
    message: string,
    created: Date,
    updated: Date
}

const addTodo = async (
  input: any
): Promise<{
  message: string;
  insertedId: string;
  created: Date;
  updated: Date;
}> => {
  const client = await clientPromise;
  const { userId } = auth();

  const timestamp = new Date();
  if (!userId) throw new Error(`You must be signed.`);

  const { insertedId } = await client
    .db()
    .collection(userId)
    .insertOne({ message: input, created: timestamp, updated: timestamp });
  return {
    insertedId: insertedId.toString(),
    message: input,
    created: timestamp,
    updated: timestamp,
  };
};

const getTodo = async (): Promise<ITodo[]> => {
  const client = await clientPromise;
  const { userId } = auth();

  if (!userId) throw new Error(`You must be signed.`);

  const todos = (await client.db().collection(userId).find({}).toArray()).map(
    ({ _id, message, created, updated }) => ({
      id: _id.toString(),
      message,
      created,
      updated,
    })
  );
  return todos;
};

export { addTodo, getTodo };
export type { ITodo }