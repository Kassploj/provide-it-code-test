export class Product {
    constructor(product) {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.description = product.description;
        this.category = product.category;
        this.image = product.image;
        this.rating = product.rating;
    }

    getProduct() {
        return {
            image: this.image,
            title: this.title,
            price: this.price,
            category: this.category
        }
    }

    getProductWithDescription() {
        return {
            image: this.image,
            title: this.title,
            price: this.price,
            category: this.category,
            description: this.description
        }
    }
}

export class ProductList {
    products = []

    constructor(productList) {
        productList = JSON.parse(productList)
        for (const product of productList) {
            this.products.push(new Product(product))
        }
    }

    // *getListing() {
    //     for (const product of this.products) {
    //         yield product.getProduct();
    //     }
    // }
    getListing() {
        const arr = []
        for (const product of this.products) {
            console.log(product)
            arr.push(product.getProduct());
        }
        return arr;
    }

    *getListingWithDescription() {
        for (const product of this.products) {
            yield product.getProductWithDescription();
        }
    }

    // filterByPrice() {

    // }

    // filterByCategory() {

    // }

    paginate(startIndex, stopIndex) {
        this.products = this.products.slice(startIndex, stopIndex);
        console.log("paged")
        console.log(this.products)
        // return this.products.slice(startIndex, stopIndex);
    }
}