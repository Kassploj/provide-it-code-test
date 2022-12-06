import express from "express";
import * as index from "./index.js";
import * as db from "./database.js"

export const storeRouter = express.Router()

storeRouter.get('/products', async (req, res) => {
    const products = await index.getProductList()
    res.send(products)
})

storeRouter.get('/products/:productId', async (req, res) => {
    const productId = req.params.productId;
    let product = await db.getProductFromDB(productId);
    if (!product) {
        product = await index.getProduct(productId)
        db.insertToDB(product)
    }
    res.send(product)
})