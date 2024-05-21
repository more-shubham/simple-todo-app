"use server";

import clientPromise from "@/lib/mongodb";
import { auth } from "@clerk/nextjs/server";
import { ObjectId } from "mongodb";

type ITodo = {
    id: string,
    message: string,
    created: Date,
    updated: Date,
    isDone?: boolean,
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
    .insertOne({ message: input, created: timestamp, updated: timestamp, isDone: false });
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

  const todos = (await client.db().collection(userId).find({}, { sort: { created: -1 } },).toArray()).map(
    ({ _id, message, created, updated, isDone }) => ({
      id: _id.toString(),
      message,
      created,
      updated,
      isDone
    })
  );
  return todos;
};

const updateTodo = async (id: string, status: boolean) => {
  const client = await clientPromise;
  const { userId } = auth();

  if (!userId) throw new Error(`You must be signed.`);
  await (await client.db().collection(userId)).findOneAndUpdate({ _id: new ObjectId(id) }, { $set:{ isDone: status }})
}

export { addTodo, getTodo, updateTodo };
export type { ITodo }