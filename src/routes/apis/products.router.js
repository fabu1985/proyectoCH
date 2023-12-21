const { Router } = require('express')
const ProductManager = require('../../dao/productManager.js')

const router = Router()

const firstManager = new ProductManager();
async function initializeProducts() {
  const products = await firstManager.getProducts()
  firstManager.products = products;
}

initializeProducts()

router.get('/', async (req, res) => {
  const products = await firstManager.getProducts();
  const limit = parseInt(req.query.limit);
  if(isNaN(limit)) {
    res.json(products);
  }else {
    const productsLimit = products.slice(0, limit);
    res.status(200).json(productsLimit)
  }
})

router.get('/:pid', async (req, res) => {
  const productId = req.params.pid;
  const foundedProduct = await firstManager.getProductById(productId);
  if(foundedProduct) {
    res.status(200).json(foundedProduct);
  }
  else{
    res.status(404).send('Missed product.')
  }
})

router.post('/', async (req, res) => {
  let newProduct = req.body;
  await firstManager.addProduct(newProduct.title,newProduct.category,newProduct.description,newProduct.price,newProduct.thumbnail,newProduct.code,newProduct.stock,newProduct.status)
  res.status(200).send("Added product succesfully...")
})

router.put('/:pid', async (req,res) => {
  const productId = parseInt(req.params.pid);
  let updateData = req.body;
  try {
    await firstManager.updateProduct(productId, updateData.newTitle, updateData.newCategory, updateData.newDescription, updateData.newPrice, updateData.newThumbnail, updateData.newCode, updateData.newStock, updateData.newStatus);
  } catch(error) {
    res.status(404).send('Product couldn´t be updated')
  }
})

router.delete('/:pid', async (req, res) => {
  const productId = req.params.pid;
  await firstManager.deleteProduct(productId)
  res.status(200).send(`Product wiht id: ${productId} was deleted succesfully`)
})

module.exports = router;