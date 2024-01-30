const { Router } = require('express')
const { productsModel } = require('../../dao/models/ecommerce.model')
const { authentication } = require('../middlewares/auth.middleware')
const router = Router();

router.get('/', authentication, (req, res) => {
    res.render('chat', {
      title: 'Chat E-commerce',
      name: 'by Fabu'
    })
  });

module.exports = router;