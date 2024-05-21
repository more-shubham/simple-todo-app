'use server';

import clientPromise from "@/lib/mongodb";
import { auth } from "@clerk/nextjs/server";
import { ObjectId } from "mongodb";

const addTodo = async (input: any): Promise<{ message: string, insertedId: string }> => {
    const client = await clientPromise
    const { userId } = auth()

    const timestamp = new Date();
    if (!userId) throw new Error(`You must be signed.`)

    const { insertedId } = await client.db().collection(userId).insertOne({ message: input, created: timestamp, updated: timestamp })
    return { insertedId: insertedId.toString(), message: input }
}

export { addTodo }