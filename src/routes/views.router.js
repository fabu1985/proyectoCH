const { Router } = require('express');
const { productsModel } = require('../dao/mongo/models/ecommerce.model');
const router = Router();

const productMock = [
    {
        id: 1, title: 'Product1', price: 22323, stock: 2, description: 'alguna descripcion',
        id: 2, title: 'Product2', price: 22323, stock: 4, description: 'alguna descripcion2',
        id: 3, title: 'Product3', price: 22323, stock: 9, description: 'alguna descripcion3'
    }
]

router.get('/', (req, res) => {
    res.render('index', {
      title: 'Mercadito Fabu',
      name: 'Fabiana Diaz Posleman'
    })
  });

  router.get('/products', async (req, res) => {
    const { numPage, limit=20 } = req.query
    const {
        docs,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        page
    } = await productsModel.paginate({}, {limit, page: numPage, lean: true})
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