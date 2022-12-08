import express from "express";
import * as db from "./database.js"
import * as api from "./api.js"
import { ProductList } from "./product.js";

export const storeRouter = express.Router()
const pageSize = 8

storeRouter.get('/products', async (req, res) => {
    try {
        const { page = 0, min, max, category } = req.query;
        const products = new ProductList(await api.getProductList(category));
        const startIndex = page ? page * pageSize : 0;
        const stopIndex = startIndex + pageSize;
        products.filter(min, max)
        products.paginate(startIndex, stopIndex)
    
        res.send(products.getListing())
    } catch (error) {
        console.error(error)
    }
})

storeRouter.get('/products/detailed', async (req, res) => {
    try {
        const { page = 0, min, max, category } = req.query;
        const products = new ProductList(await api.getProductList());
        const startIndex = page ? page * pageSize : 0;
        const stopIndex = startIndex + pageSize;
        products.filter(min, max, category)
        products.paginate(startIndex, stopIndex)
    
        res.send(products.getListingWithDescription())
    } catch (error) {
        console.error(error)
    }
})

storeRouter.get('/products/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        let product = await db.getProductFromDB(productId);
        if (!product) {
            product = await api.getProduct(productId)
            db.insertToDB(product)
        }
    
        res.send(product)
    } catch (error) {
        console.error(error)
    }
})