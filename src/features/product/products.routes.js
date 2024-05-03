// Manage routes/paths to ProductController

import  express  from 'express';
import  ProductController from './product.controller.js'
import { upload } from '../../middlewares/fileupload.middleware.js'

// Initialize Express router.
const ProductRouter = express.Router();

const productController = new ProductController();
ProductRouter.get('/filter', (req, res) => {productController.filterProducts(req, res)});

ProductRouter.post('/rate', (req, res, next) => {productController.rate(req, res, next)});
ProductRouter.get('/', (req, res) => {productController.getAllProducts(req, res)});
ProductRouter.post('/', upload.single('imageUrl'), (req, res) => {productController.addProduct(req, res)});
ProductRouter.get('/:id',  (req, res) => {productController.getOneProduct(req, res)});

export default ProductRouter;