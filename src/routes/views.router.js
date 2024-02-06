const { Router } = require('express');
const { productsModel, usersModel } = require('../dao/mongo/models/ecommerce.model');
const { authentication } = require('../middlewares/auth.middleware')
const router = Router()

router.get('/', (req, res) => {
    res.render('index', {
      title: 'Mercadito Fabu',
      name: 'Fabiana Diaz Posleman'
    })
  });

 /* router.get('/products', authentication, async (req, res) => {
    const { numPage, limit=20 } = req.query
    const {
        docs,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        page
    } = await productsModel.paginate({}, {limit, page: numPage, lean: true})
        res.render('products', {
        name: req.session.user.first_name,
        lastName: req.session.user.last_name,
        mail: req.session.user.email,
        rol: req.session.user.admin,
        products: docs,
        hasNextPage,
        hasPrevPage,
        prevPage,
        nextPage,
        page
    })
});*/

module.exports = router