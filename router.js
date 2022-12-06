import express from "express";
import * as db from "./database.js"
import * as api from "./api.js"

export const storeRouter = express.Router()
const pageSize = 8
storeRouter.get('/products', async (req, res) => {
    const page = req.query.page ? req.query.page : 0;
    let products = await api.getProductList()
    products = paginate(products, page)

    res.send(products)
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

function paginate(list, page) {
    const startIndex = page ? page * pageSize : 0;
    const stopIndex = startIndex + pageSize;

    return list.slice(startIndex, stopIndex);
}