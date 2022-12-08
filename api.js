import got from "got";
import { ProductList } from "./product.js";

const STORE_API_DOMAIN = "https://fakestoreapi.com"

export async function getProduct(productId) {
    const products = await got.get(`${STORE_API_DOMAIN}/products/${productId}`)
        .then(data => {
            return data.body
        });
    return products;
}

export async function getProductList(category) {
    const endpoint = category ? `products/category/${category}` : "products"
    const products = await got.get(`${STORE_API_DOMAIN}/${endpoint}`)
        .then(data => {
            return data.body;
        });
    return products;
}