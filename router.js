import express from "express";
import * as index from "./index.js";

export const storeRouter = express.Router()

router.get('/products', async (req, res) => {
    const products = await index.getProductList()
    res.send(products)
})

router.get('/products/:productId', async (req, res) => {
    const productId = req.params.productId;
    let product = await index.getProductFromDB(productId);
    if (!product) {
        product = await index.getProduct(productId)
        index.insertToDB(product)
    }
    res.send(product)
})

router.get('/db/:productId', async (req, res) => {
    const productId = req.params.productId;
    const product = await index.getProductFromDB(productId)
    res.send(product)
})