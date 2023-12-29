const { Router } = require('express');
const { cartsModel } = require('../../dao/mongo/models/ecommerce.model.js')
const router = Router();

router
    .get('/:cid', async (req,res)=>{
        const {cid} = req.params

        const cart = await cartsModel.findOne({_id: cid }) 

        res.send({
            status: 'success',
            payload: cart        
        })
    })
    .post('/', async (req,res)=>{
        const newCart = req.body

        const result = await cartsModel.create(newCart)

        
        res.send({
            status: 'success',
            payload: result
        })
    })

module.exports = router;
/* funcionaban ok antes de lo de mongo
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
})*/

module.exports = router;