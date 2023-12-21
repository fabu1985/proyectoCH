const { Router } = require('express');
const CartManager = require('../../dao/cartManager.js')
const { cartsModel } = require('../../dao/models/ecommerce.model')
const router = Router();

router.post('/', async (req, res) =>{
  try {
      const {products} = req.body
      // validación
      const result = await cartsModel.create({
        products
      })
      console.log(products)
      res.status(200).send({ 
          status: 'Cart was created succesfully.',
          payload: result        
      })
  } catch (error) {
    res.status(404).send('Check your data')
  }
});


router.get('/:cid', async (req, res) =>{
  // sinc o async ?
  try {
      const { cid } = req.params;
      const foundedCart = await cartsModel.find({_id: cid})
      res.send(`cart wiht id: ${foundedCart}`)
    } catch (error) {
      console.log(error)
  }
})

module.exports = router;