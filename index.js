import express from "express";
import got from "got";

const app = express();

app.get('/products', async (req, res) => {
    const products = await getProductList()
    res.send(products)
  })

app.get('/products/:productId', async (req, res) => {
    const productId = req.params.productId;
    const product = await getProduct(productId)
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

async function getProductList() {
    const products = await got.get("https://fakestoreapi.com/products")
    .then(data => {
        return data.body
    });
    return products;
}