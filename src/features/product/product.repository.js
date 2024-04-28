import { getDB } from "../../config/mongodb";

class ProductRepository {

    // to aviod the hardcoding the 'products' use constructor
    constructor() {
        this.collection = "products";
    }

    async add(newProduct) {
        // 1, Get the DB
        const db = getDB();

        // 2. Get the collection
        const collection = db.collection('products');


    }

    async getAll() {

    }

    async get() {

    }
}