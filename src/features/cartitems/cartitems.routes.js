import  express from 'express';
import CartItemController from "./cartitems.controller.js";

const cartRouter = express.Router();
const cartItemsController = new CartItemController();


cartRouter.delete('/:id', (req, res, next) => {cartItemsController.delete(req, res, next)});
cartRouter.post('/' , (req, res, next) => {cartItemsController.add(req, res, next)});
cartRouter.get('/', (req, res, next) => {cartItemsController.get(req, res, next)});

export default cartRouter;