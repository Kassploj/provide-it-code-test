import express from "express";
import * as db from "./database.js"
import * as api from "./api.js"
import { ProductList } from "./product.js";

export const storeRouter = express.Router()
const pageSize = 8

storeRouter.get('/products', async (req, res) => {
    const page = req.query.page ? req.query.page : 0;
    const products = new ProductList(await api.getProductList());
    const startIndex = page ? page * pageSize : 0;
    const stopIndex = startIndex + pageSize;
    products.paginate(startIndex, stopIndex)

    res.send(products.getListing())
})

storeRouter.get('/products/detailed', async (req, res) => {
    const page = req.query.page ? req.query.page : 0;
    const products = new ProductList(await api.getProductList());
    const startIndex = page ? page * pageSize : 0;
    const stopIndex = startIndex + pageSize;
    products.paginate(startIndex, stopIndex)

    res.send(products.getListingWithDescription())
})

storeRouter.get('/products/:productId', async (req, res) => {
    const productId = req.params.productId;
    let product = await db.getProductFromDB(productId);
    if (!product) {
        product = await api.getProduct(productId)
        db.insertToDB(product)
    }

    res.send(product)
})