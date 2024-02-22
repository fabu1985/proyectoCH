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
            res.send({status: 'success', payload: product})
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }
    
    create = async (req, res) => {
        try {
            const {title, description, price, stock, thumbnail, category} = req.body
            const result = await this.service.create({
                title,
                description, 
                price,
                stock, 
                category,
                thumbnail
            })
            // validar la respuoesta de la base de datos
            res.send({status: 'success', payload: result})
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }
    update = async (req, res) => {
        try {
            const { pid } = req.params
            const productToUpdate = req.body
            const result = await this.service.update({_id: pid}, productToUpdate)
            res.send({status: 'success', payload: result})
        } catch (error) {
            res.status(500).send({message: error.message})
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