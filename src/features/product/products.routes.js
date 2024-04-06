// Manage routes/paths to ProductController

import  express  from 'express';
import  ProductController from './product.controller.js'

// Initialize Express router.
const ProductRouter = express.Router();
import { upload } from '../../middlewares/fileupload.middleware.js'

const productController = new ProductController();

ProductRouter.post('/rate', productController.rateProduct);
ProductRouter.get('/', productController.getAllProducts);
ProductRouter.post('/', upload.single('imageUrl'), productController.addProduct);
ProductRouter.get('/:id', productController.getOneProduct);

export default ProductRouter;