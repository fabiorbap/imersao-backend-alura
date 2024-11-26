import 'dotenv/config';
import connectToDB from '../config/dbConfig.js';
import { ObjectId } from 'mongodb';

const connection = await connectToDB(process.env.STRING_CONEXAO)

export async function getAllPosts() {
    const db = connection.db('imersao-instabyte')
    const collection = db.collection('posts')
    return collection.find().toArray()
}

export async function createNewPost(newPost) {
    const db = connection.db('imersao-instabyte')
    const collection = db.collection('posts')
    return collection.insertOne(newPost)
}

export async function updatePost(id, newPost) {
    const db = connection.db('imersao-instabyte')
    const collection = db.collection('posts')
    const objectId = ObjectId.createFromHexString(id)
    return collection.updateOne({_id: new ObjectId(objectId)}, {$set: newPost})
}