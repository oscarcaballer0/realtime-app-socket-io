import {MongoClient} from 'mongodb';

// Connect to MongoDB
const client = new MongoClient('mongodb+srv://oscarcaballero:TJl4LoFRVHvcpfqi@cluster-test.xyba2gy.mongodb.net/?retryWrites=true&w=majority&appName=cluster-test');

export async function connectMongoDB() {
  await client.connect();
  console.log('Connected to MongoDB');

  const db = client.db('todosdb');
  const collection = db.collection('todos');

  return collection;
}



