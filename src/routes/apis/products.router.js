const { Router } = require('express')
const { authentication } = require('../../middlewares/auth.middleware.js')
const router = Router()
const ProductController = require('../../controllers/products.controller.js');

const productController = new ProductController()

router.get('/', productController.getProducts)

router.get('/:pid', productController.getProduct )

router.post('/', productController.createProduct);

router.put('/:pid', productController.updateProduct);

router.delete('/:pid', productController.deleteProduct);

module.exports = router;