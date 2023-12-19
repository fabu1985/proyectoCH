const { Router } = require('express')
const router = Router()

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

  router.get('/products', (req, res) => {
    const userMock = {
        title: 'Fabu',
        name: 'Diaz Posleman',
        role: 'admin'
    }
    res.render('products', {
        title: userMock.title,
        name: userMock.name,
        isAdmin: userMock.role == 'admin',
        products: productMock
    })
  })

module.exports = router