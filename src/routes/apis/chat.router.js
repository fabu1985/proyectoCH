const { Router } = require('express')
const { productsModel } = require('../../dao/models/ecommerce.model')
const router = Router();

router.get('/', (req, res) => {
    res.render('chat', {
      title: 'Chat E-commerce',
      name: 'by Fabu'
    })
  });

module.exports = router;