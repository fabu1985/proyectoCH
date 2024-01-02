const { Router } = require('express')
const { orderModel } = require('../../dao/mongo/models/orders.model')
const router = Router()
//

router.get('/', async (req, res) =>{
try {
    // const orders = await orderModel.find({})
    const {size} = req.query;
    const orders = await orderModel.aggregate([
        {$match: {size}},
        {$group: {_id: '$name', totalQuantity: {$sum: '$quantity'}}},
        {$sort: {totalQuantity: -1}},
        {$group: {_id: 1, orders: {$push: '$$ROOT'}}},
        // esto hace q guarde una colleciont nueva llamada 'reports' con el array resultante
        {$project: {'_id':0, orders: '$orders'}},
        {$merge: {into: 'reports'}}
    ])
        res.send(orders)
  } catch (error) {
    console.log(error)
}
})

module.exports = router

