import got from "got";

const STORE_API_DOMAIN = "https://fakestoreapi.com"

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