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
    const product = await getProduct(productId)
    res.send(product)
  })

  app.get('/db/:productId', async (req, res) => {
    console.log(req.params)
    const productId = req.params.productId;
    console.log(productId)
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
    const database = dbClient.db("new");
    const movies = database.collection("coll");
    const query = { id: parseInt(productId) };
    
    const products = await movies.findOne(query);
    return products;
}

async function getProductList() {
    const products = await got.get("https://fakestoreapi.com/products")
    .then(data => {
        return data.body
    });
    return products;
}