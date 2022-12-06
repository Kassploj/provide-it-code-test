import express from "express";
import { storeRouter } from "./router.js"
import { MongoClient } from "mongodb";
import got from "got";

const app = express();
const dbClient = new MongoClient("mongodb://127.0.0.1:27017")
const STORE_API_DOMAIN = "https://fakestoreapi.com"

app.listen(3000)
app.use(storeRouter)

export async function getProduct(productId) {
    const products = await got.get(`${STORE_API_DOMAIN}/products/${productId}`)
        .then(data => {
            return data.body
        });
    return products;
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
export async function getProductList() {
    const products = await got.get(`${STORE_API_DOMAIN}/products`)
        .then(data => {
            return data.body
        });
    return products;
}

export async function insertToDB(item) {
    const collection = getMongoDBCollection()

    await collection.insertOne(JSON.parse(item));
    console.log(`Inserted ${item} into database.`)
}

function getMongoDBCollection() {
    return dbClient.db("new").collection("coll");
}