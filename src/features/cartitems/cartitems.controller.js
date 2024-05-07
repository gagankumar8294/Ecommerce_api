import CartItemsRepository from "./cartItems.repository.js";
import CartItemModel from "./cartitems.model.js";


export default class CartItemController {

    constructor() {
        this.cartItemsRepository = new CartItemsRepository();
    }

    async add(req, res){
        try {
        const { productID, quantity } = req.query;
        const userID = req.userID;
        await this.cartItemsRepository.add(productID, userID, quantity)
        res.status(201).send('Cart is updated');
        } catch(err) {
            console.log(err);
            return res.status(200).send("Something went wrong");
        }
    }

    get(req, res) {
        const userID = req.userID;
        const items = CartItemModel.get(userID);
        return res.status(200).send(items);
    }

    delete(req, res){
        const userID = req.userID;
        const cartItemID = req.params.id;
        const error = CartItemModel.delete(
            cartItemID, userID
        );
        if (error) {
            return res.status(404).send(error)
        }
        return res.status(200).send('Cart Item is removed');
    }
}