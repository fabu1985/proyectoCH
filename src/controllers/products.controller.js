const { productService } = require("../repositories/index.js");


class ProductController {
    constructor(){
        this.service = productService
    }

    getAll = async (req, res) => {
        try {
            const products = await this.service.getAll()
            res.send({status: 'success', payload: products})
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }
    get = async (req, res) => {
        try {
            const { pid } = req.params
            const product = await this.service.get({_id: pid})
            if(product){
            res.send({status: 'success', payload: product})
            } else {
                res.status(404).send("Product not exist")
            }
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }
    
    create = async (req, res) => {
        try {
            const {title, description, price, stock, thumbnail, category, code, status} = req.body
            const result = await this.service.create({
                title,
                description, 
                price,
                stock, 
                thumbnail,
                category,
                code,
                status
            })
            // validar la respuoesta de la base de datos
            res.send({status: 'success', payload: result})
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }
    update = async (req, res) => {
        try{
            const pid = req.params.pid
            const {title, description, price, thumbnail, code, stock, status, category} = req.body
            await this.productService.update(pid, title, description, price, thumbnail, code, stock, status, category)
            res.json({
                status: 'success',
                message: 'Product updated successfully',
            })
        }catch(error){
            console.log(error)
            res.status(500).send('server error')
        }
    }

    delete = async (req, res) => {
        try {
            const { pid } = req.params
            const result = await this.service.delete({_id: pid})
            res.send({status: 'success', payload: result})
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }
}

module.exports = {
    ProductController
}