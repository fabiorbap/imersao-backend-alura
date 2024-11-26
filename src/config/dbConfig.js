import { MongoClient } from 'mongodb';

export default async function connectToDB(stringConexao) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(stringConexao);
        console.log('Connecting to the database cluster...');
        await mongoClient.connect();
        console.log('Successfully connected to MongoDB Atlas!');

        return mongoClient;
    } catch (erro) {
        console.error('DB connection failure!', erro);
        process.exit();
    }
}