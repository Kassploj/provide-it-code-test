import { MongoClient } from "mongodb";

const dbClient = new MongoClient("mongodb://127.0.0.1:27017")

function getMongoDBCollection() {
    return dbClient.db("new").collection("coll");
}

export async function getProductFromDB(productId) {
    const collection =  getMongoDBCollection();
    const query = { id: parseInt(productId) };

    const product = await collection.findOne(query)
        .then(data => {
            return data;
        });
    return product
}

export async function insertToDB(item) {
    const collection = getMongoDBCollection()

    await collection.insertOne(JSON.parse(item));
    console.log(`Inserted ${item} into database.`)
}
