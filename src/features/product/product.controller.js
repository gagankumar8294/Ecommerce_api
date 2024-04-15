import ProductModel from "./product.model.js";

export default class productController {

    getAllProducts(req, res){
        const products = ProductModel.getAll();
        res.status(200).send(products);
    }

    addProduct(req, res){
        const { name , price , sizes, } = req.body;
        const newProduct = {
            name: name, 
            price:parseFloat(price),
            sizes: sizes.split(','),
            imageUrl: req.file.filename,
        };
        const createRecord = ProductModel.add(newProduct);
        res.status(201).send(createRecord);
    }

    rateProduct(req, res){
  
        const userID = req.query.userID;
        const productID = req.query.productID;
        const rating = req.query.rating;

        try {
            ProductModel.rateProduct(
                userID, productID, rating
            );
        } catch (err) {
            return res.status(400).send(err);
        } 
        return res.status(200).send('Rating has been updated successfully');
    }

    getOneProduct(req, res){
        const id = req.params.id ;
        const product = ProductModel.get(id);
        if(!product){
            res.status(404).send('product not found');
        } else {
            return res.status(200).send(product); 
        }
    }

    // Filter products
    filterProducts(req, res) {
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;
        const category = req.query.category;
        const product = ProductModel.filter(minPrice, maxPrice , category);
        
        
            res.status(200).send(product);
    
    }
}