const { Router } = require('express');
const CartManager = require('../../dao/cartManager.js')
const { cartsModel } = require('../../dao/mongo/models/ecommerce.model')
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