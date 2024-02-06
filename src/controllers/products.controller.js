const ProductDaoMongo = require("../dao/mongo/productsDaoMongo")

class ProductController {
    constructor (){
        this.productsService = new ProductDaoMongo()
    }
    getProducts = async (req, res) => {
        try {
          const products = await this.productsService.getProducts()
          res.send({
            status: 'success',
            payload: products
          })
      } catch (error) {
          console.log(error)
      }
    }

    getProduct = async (req, res) =>{
        try {
            const { pid } = req.params;
            const foundedProduct = await this.productsService.find({_id: pid})
            res.send(`Product wiht id: ${foundedProduct}`)
          } catch (error) {
            console.log(error)
        }
      }
    
    createProduct = async (req, res) =>{
        try {
            const {title, category, description, price, thumbnail, code, stock, status} = req.body
            const newProduct = await this.productsService.create({
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
      }
    
    updateProduct = async (req,res) => {
        try {
          const { pid } = req.params;
          const userToReplace = req.body;
          const result = await this.productsService.updateOne({_id: pid}, userToReplace);
          res.status(200).send({ 
            status: 'success',
            payload: result 
        })
        } catch (error) {
          res.status(404).send('Product couldn´t be updated');
        }
      }
    
    deleteProduct = async (req, res) => {
        // sinc o async ?
        try {const { pid } = req.params;
      await this.productsService.deleteOne({_id: pid})
        res.send(`Deleted product wiht id: ${pid}`)
        } catch (error) {
        res.status(404).send('Product couldn´t be deleted');
      }
      }
    }
    
    module.exports = ProductController