import  express  from "express";
import  productRouter  from './src/features/product/products.routes.js'
import userRouter from "./src/features/user/user.routes.js";
import bodyParser from "body-parser";
// Crate Server
const server = express();
server.use(bodyParser.json())

// for all requests related to products, redirect to product routes.
server.use('/api/products', productRouter);
server.use('/api/users', userRouter);


server.get("/", (req, res) => {
    res.send("Welcome to Ecommerce Api");
})


server.listen(3200);

console.log("server listenig on port http://localhost:3200");