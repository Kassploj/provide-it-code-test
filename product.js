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

    getListing() {
        const listing = []
        for (const product of this.products) {
            listing.push(product.getProduct());
        }
        return listing;
    }

    getListingWithDescription() {
        const listing = []
        for (const product of this.products) {
            listing.push(product.getProductWithDescription());
        }
        return listing;
    }

    filterByPrice(min, max) {
        this.products = this.products.filter(product => product.price >= min && product.price <= max)
    }

    filterByCategory(category) {
        this.products = this.products.filter(product => product.category === category)
    }

    filter(min, max) {
        if (min && max) {
            this.filterByPrice(min, max)
        }
    }

    paginate(startIndex, stopIndex) {
        if (this.products.length > 8) {
            this.products = this.products.slice(startIndex, stopIndex);
        } else { 
            return;
        }
    }
}
