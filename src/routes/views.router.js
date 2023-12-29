const { Router } = require('express');
const { productsModel } = require('../dao/mongo/models/ecommerce.model');
const { cartsModel } = require('../dao/mongo/models/ecommerce.model');
const router = Router();

router.get('/', (req, res) => {
    res.render('index', {
      title: 'Mercadito Fabu',
      name: 'Fabiana Diaz Posleman'
    })
  });

  router.get('/carts', async (req, res) => {
    const { numPage=1, limit=2 } = req.query
    const {
        docs,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        page
    } = await productsModel.paginate({}, {limit, page: numPage, lean: true})
    res.render('carts', {
        carts: docs,
        hasNextPage,
        hasPrevPage,
        prevPage,
        nextPage,
        page
    })
  });

router.get('/products', async (req, res) => {
    const { numPage=1, limit=10, sort } = req.query
    const {
        docs,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        page
    } = await productsModel.paginate({}, {limit, page: numPage, sort, lean: true})
    // console.log(result)
    res.render('products', {
        products: docs,
        hasNextPage,
        hasPrevPage,
        prevPage,
        nextPage,
        page
    })
});

module.exports = router