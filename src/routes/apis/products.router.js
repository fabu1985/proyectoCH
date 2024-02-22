const { Router } = require('express')
const { ProductController } = require('../../controllers/products.controller')
const { authentication } = require('../../middlewares/auth.middleware.js')

const router = Router()
const productController = new ProductController()

router.get('/', productController.getAll)

router.get('/:pid', productController.get)

router.post('/', authentication, productController.create)

router.put('/:pid', authentication,productController.update)

router.delete('/:pid', authentication, productController.delete)

module.exports = router