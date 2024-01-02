const { Router } = require('express')
const { productsModel } = require('../../dao/mongo/models/ecommerce.model.js')
const router = Router();

router.get('/', async (req, res) =>{
  try {
    const products = await productsModel.paginate({}, {limit: 10, page: 1, sort: {price: 1}, lean: true}) 
    res.send(products)
    
} catch (error) {
    console.log(error)
}
});

router.get('/:pid', async (req, res) =>{
  // sinc o async ?
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
      // validación
      const result = await productsModel.create({
        title, category, description, price, thumbnail, code, stock, status
      })
      console.log(title, category, description, price, thumbnail, code, stock, status)
      res.status(200).send({ 
          status: 'success',
          payload: result        
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
  // sinc o async ?
  try {
    const { pid } = req.params;
    await productsModel.deleteOne({_id: pid})
    res.send(`Deleted product wiht id: ${pid}`)
  } catch (error) {
  res.status(404).send('Product couldn´t be deleted');
}
});

module.exports = router;