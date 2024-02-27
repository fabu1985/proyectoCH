const { Router } = require('express')
const { productsModel } = require('../../dao/models/products.model')
const { authentication } = require('../../middlewares/authorization.middleware')
const router = Router();

router.get('/', authentication, (req, res) => {
    res.render('chat', {
      title: 'Chat E-commerce',
      name: 'by Fabu'
    })
  });

module.exports = router;