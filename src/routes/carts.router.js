const { Router } = require('express');
const CartManager = require('../cartManager.js');

const router = Router();

const firstCartManager = new CartManager();


router.post('/', async (req, res) => {
  let newCart = req.body;
  await firstCartManager.createCart(newCart.title,newCart.category,newCart.description,newCart.price,newCart.thumbnail,newCart.code,newCart.stock,newCart.status)
  res.status(200).send("Cart was created succesfully.")
})

router.get('/:cid', async (req, res) => {
  const cartId = req.params.cid;
  const carritoEncontrado = await firstCartManager.getCartById(cartId);
  if(carritoEncontrado) {
    res.status(200).json(carritoEncontrado);
  }
  else{
    res.status(404).send('Cart didn´t found.')
  }
})

router.post('/:cid/product/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  await firstCartManager.addProductToCart(cartId, productId);
  res.status(200).send('The product was saved on cart succesfully.')
})

module.exports = router;