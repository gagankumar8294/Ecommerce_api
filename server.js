import './env.js';

import  express  from "express";
import  productRouter  from './src/features/product/products.routes.js'
import userRouter from "./src/features/user/user.routes.js";
import bodyParser from "body-parser";
// import basicAuthorizer from "./src/middlewares/basicAuth.middleware.js"
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import cartRouter from "./src/features/cartitems/cartitems.routes.js";
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import { ApplicationError } from "./src/error-handler/applicationError.js";
import { connectToMongoDB } from "./src/config/mongodb.js";

// Crate Server
const server = express();
server.use(bodyParser.json())

server.use(loggerMiddleware);

// for all requests related to products, redirect to product routes.
server.use('/api/products',jwtAuth, productRouter);
server.use('/api/users', userRouter);
server.use('/api/cart', jwtAuth, cartRouter);

server.get("/", (req, res) => {
    res.send("Welcome to Ecommerce Api");
})

server.use((err, req, res, next) => {
    console.log(err);
    if(err instanceof ApplicationError){
        res.status(err.code).send(err.message);
    }
    res.status(500).send('Something went wrong, Please try later');
})

// Middleware to Handle 404 requests
server.use((req, res) => {
    res.status(404).send("API not Found");
})

server.listen( 3200, () => {
    console.log("server listenig on port http://localhost:3200");
    connectToMongoDB();
});

