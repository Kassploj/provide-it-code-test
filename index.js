import express from "express";
import { MongoClient } from "mongodb";
import got from "got";

const app = express();
const dbClient = new MongoClient("mongodb://127.0.0.1:27017")

app.get('/products', async (req, res) => {
    const products = await getProductList()
    res.send(products)
})

app.get('/products/:productId', async (req, res) => {
    const productId = req.params.productId;
    let product = await getProductFromDB(productId);
    console.log(product)
    if (!product) {
        product = await getProduct(productId)
        insertToDB(product)
    }
    res.send(product)   
})

app.get('/db/:productId', async (req, res) => {
    const productId = req.params.productId;
    const product = await getProductFromDB(productId)
    res.send(product)
})
app.listen(3000)

async function getProduct(productId) {
    const products = await got.get(`https://fakestoreapi.com/products/${productId}`)
        .then(data => {
            return data.body
        });
    return products;
}

async function getProductFromDB(productId) {
    const collection =  getMongoDBCollection();
    const query = { id: parseInt(productId) };

    const product = await collection.findOne(query)
        .then(data => {
            return data;
        });
    return product
}
async function getProductList() {
    const products = await got.get("https://fakestoreapi.com/products")
        .then(data => {
            return data.body
        });
    return products;
}

async function insertToDB(item) {
    const collection = getMongoDBCollection()

    await collection.insertOne(JSON.parse(item));
    console.log(`Inserted ${item} into database.`)
}

function getMongoDBCollection() {
    const collection = dbClient.db("new").collection("coll");

    return collection;
}