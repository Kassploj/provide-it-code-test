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

export async function getProductList() {
    const products = await got.get(`${STORE_API_DOMAIN}/products`)
        .then(data => {
            return data.body
        });
    return products;
}