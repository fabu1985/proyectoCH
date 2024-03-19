const { productService } = require("../repositories/index.js");
const CustomError = require("../services/errors/CustomError.js");
const { EErrors } = require("../services/errors/enum.js");
const { generateProductErrorInfo } = require("../services/errors/generateErrorInfo.js");


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
    
    create = async (req, res, next) => {
        try {
            const {title, description, price, stock, thumbnail, category, code, status, owner} = req.body
            if(!title || !description  ||  !price  ||  !stock  ||  !thumbnail  ||  !category  ||  !code  ||  !status ||  !owner){
                CustomError.createError({
                    name: 'Error trying to create a Product',
                    cause: generateProductErrorInfo(title),
                    message: 'Make sure that you put all the required data',
                    code: EErrors.INVALID_TYPES_ERROR
                })
            }
            const result = await this.service.create({
                title,
                description, 
                price,
                stock, 
                thumbnail,
                category,
                code,
                status,
                owner
            })
            // validar la respuoesta de la base de datos
            res.send({status: 'success', payload: result})
        } catch (error) {
            next(error)
        }
    }
    update = async (req, res, next) => {
        try{
            const pid = req.params.pid
            const {title, description, price, thumbnail, code, stock, status, category, owner} = req.body
            if(!title || !description  ||  !price  ||  !stock  ||  !thumbnail  ||  !category  ||  !code  ||  !status  ||  !owner){
                CustomError.createError({
                    name: 'Error trying to update a Product',
                    cause: generateProductErrorInfo(title),
                    message: 'Make sure that you put all the required data',
                    code: EErrors.INVALID_TYPES_ERROR
                })
            }
            await this.productService.update(pid, title, description, price, thumbnail, code, stock, status, category, owner)
            res.json({
                status: 'success',
                message: 'Product updated successfully',
            })
        }catch (error) {
            next(error)
        }
    }

    delete = async (req, res, next) => {
        try {
            const { pid } = req.params
            const result = await this.service.delete({_id: pid})
            res.send({status: 'success', payload: result})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    ProductController
}