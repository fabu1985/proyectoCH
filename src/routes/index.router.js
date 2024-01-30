const { Router } = require('express')
const userRouter = require('./users.router.js')
const carritoRouter = require('./carts.router.js')
const productsRouter = require('./products.router.js')
const pruebasRouter = require('./pruebas.router.js')
const viewsRouter = require('./views.router.js')
const ordersRouter = require('./orders.router.js')
const sessionsRouter = require('./sessions.router.js')
// const userClassRouter = require('./usersClass.router.js')
const { uploader } = require('../utils/uploader.js')

const router = Router()

router.post('/uploader', uploader.single('myFile'), (req,res)=>{
    res.send('Imagen subida')
  });

router.use('/api/products', productsRouter);
router.use('/api/pruebas', pruebasRouter);
router.use('/api/carts', carritoRouter);
router.use('/api/users', userRouter)
router.use('/views', viewsRouter);
router.use('/api/orders', ordersRouter);
router.use('/api/sessions', sessionsRouter);
//router.use('/api/usersClass', userClassRouter.getRouter());
router.post('/uploader', uploader.single('myFile'), (req, res)=>{

    res.send('Imagen subida')
})
module.exports = router