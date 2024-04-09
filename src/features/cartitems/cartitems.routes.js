import  express from 'express';
import CartItemController from "./cartitems.controller.js";

const cartRouter = express.Router();
const cartItemsController = new CartItemController();


cartRouter.delete('/:id', cartItemsController.delete);
cartRouter.post('/' , cartItemsController.add);
cartRouter.get('/', cartItemsController.get);

export default cartRouter;