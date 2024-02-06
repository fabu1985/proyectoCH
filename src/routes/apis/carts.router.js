const { Router } = require('express');
const { cartsModel, productsModel } = require('../../dao/mongo/models/ecommerce.model.js')
const { authentication } = require('../../middlewares/auth.middleware.js')
const router = Router();

router
    .get('/:cid', authentication, async (req,res)=>{
        const {cid} = req.params

        const cart = await cartsModel.findOne({_id: cid }) 

        res.send({
            status: 'success',
            payload: cart        
        })
    })
    .post('/', authentication, async (req,res)=>{
        const newCart = req.body

        const result = await cartsModel.create(newCart)

        
        res.send({
            status: 'success',
            payload: result
        })
    });

    router.delete('/:cid', authentication, async (req, res) => {
      try {
        const { cid } = req.params;
        await cartsModel.deleteOne({_id: cid})
        res.send(`Deleted Cart wiht id: ${cid}`)
      } catch (error) {
      res.status(404).send('Cart couldn´t be deleted');
    }
    });

    router.put('/:cid', authentication, async (req,res) => {
      try {
        const { cid } = req.params;
        const productsToReplace = req.body;
        const result = await cartsModel.updateOne({_id: cid}, productsToReplace);
        res.status(200).send({ 
          status: 'success',
          payload: result 
      })
      } catch (error) {
        res.status(404).send('Product couldn´t be updated');
      }
    });

module.exports = router;