import { ObjectId } from 'mongodb';
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from '../../error-handler/applicationError.js'

 class ProductRepository {

    // to aviod the hardcoding the 'products' use constructor
    constructor() {
        this.collection = "products";
    }

    async add(newProduct) {
        try {
            // 1, Get the DB
            const db = getDB();

            // 2. Get the collection
            const collection = db.collection(this.collection);
            await collection.insertOne(newProduct);
            return newProduct;
        } catch(err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async getAll() {
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const products = await collection.find().toArray();
            console.log(products);
            return products;
        } catch(err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async get(id) {
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            return await collection.findOne({_id: new ObjectId(id)});
        } catch(err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async filter(minPrice, maxPrice, category){
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            let filterExpression={};
            if (minPrice){
                filterExpression.price = {$gte: parseFloat(minPrice)}
            }
            if(maxPrice) {
                filterExpression.price = {
                    // instead of Overwriting it will consider both the statements
                    ...filterExpression.price,
                     $lte: parseFloat(maxPrice)
                    }
            }
            if(category) {
                filterExpression.category = category
            }
            return collection.find(filterExpression).toArray();
        } 
        catch(err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async rate(userID, produtID, rating) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            collection.updateOne({
                _id: new ObjectId(produtID)
            }, {
                $push:{ratings: {userID: new ObjectId(userID), rating}}
            })
        } catch(err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
}

export default ProductRepository;