const { Router } = require('express')
const ProductManager = require('../../dao/productManager.js')
const { productsModel } = require('../../dao/mongo/models/ecommerce.model')
const router = Router();

router.get('/', async (req, res) =>{
  try {
    // const users = await usersModel.find({}).limit(50) // 5000 -> 100
    const products = await productsModel.paginate({}, {limit: 10, page: 1, lean: true}) 
    res.send(products)
    
} catch (error) {
    console.log(error)
}
})

router.get('/:pid', async (req, res) =>{
  try {
      const { pid } = req.params;
      const foundedProduct = await productsModel.find({_id: pid})
      res.send(`Product wiht id: ${foundedProduct}`)
    } catch (error) {
      console.log(error)
  }
})

router.post('/', async (req, res) =>{
  try {
      const {title, category, description, price, thumbnail, code, stock, status} = req.body
      const newProduct = await productsModel.create({
        title, category, description, price, thumbnail, code, stock, status
      })
      console.log(title, category, description, price, thumbnail, code, stock, status);
      res.status(200).send({ 
          status: 'success',
          payload: newProduct        
      })
  } catch (error) {
    res.status(404).send('Check your data')
  }
});

router.put('/:pid', async (req,res) => {
  try {
    const { pid } = req.params;
    const userToReplace = req.body;
    const result = await productsModel.updateOne({_id: pid}, userToReplace);
    res.status(200).send({ 
      status: 'success',
      payload: result 
  })
  } catch (error) {
    res.status(404).send('Product couldn´t be updated');
  }
});

router.delete('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    await usersModel.deleteOne({_id: pid})
    res.send(`Deleted product wiht id: ${pid}`)
  } catch (error) {
  res.status(404).send('Product couldn´t be deleted');
}
});

module.exports = router;