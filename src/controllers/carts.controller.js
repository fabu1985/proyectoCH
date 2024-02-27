const mongoose = require('mongoose')
const { cartService, usersService, productService } = require('../repositories/index')
const { ticketModel } = require('../dao/mongo/models/ticket.model')

class CartController {
    constructor(){
        this.cartService = cartService
        this.usersService = usersService
        this.productService = productService
        this.ticketModel = ticketModel
    }

    getCarts = async (req,res)=>{
        try{
            const allCarts = await this.cartService.getCarts()
            res.json({
                status: 'success',
                payload: allCarts
            })
        }catch(error){
            console.log(error)
            res.status(500).send('Server error')
        }
    }

    createCart = async (req,res)=>{
        try{
            const newCart = await this.cartService.createCart()
            res.json({
                status: 'success',
                payload: newCart
            })
        }catch(error){
            console.log(error)
            res.status(500).send('Server error')
        }
    }

    getCartById = async (req,res)=> {
        try{
            const cid = req.params.cid
            const filteredCart = await this.cartService.getCartById(cid)
            if(filteredCart){
                res.json({
                    status: 'success',
                    payload: filteredCart
                })
            }
            else{
                res.status(404).send("Product not exist");
            }
        }catch(error){
            console.log(error)
            res.status(500).send('Server error')
        }
    }

    addProductToCart = async (req,res)=>{
        try{
            const { cid, pid} = req.params
            const cartId = new mongoose.Types.ObjectId(cid)
            const productId = new mongoose.Types.ObjectId(pid)
            const productInCart = await this.cartService.addProductToCart(cartId, productId)
            res.json({
                status: 'success',
                payload: productInCart
            })
            
        }catch(error){
            console.log(error)
            res.status(500).send('Server error')
        }
    }

    removeProductFromCart = async (req,res) =>{
        try {
            const { cid, pid } = req.params
            const result = await this.cartService.removeProductFromCart(cid, pid)
      
            if (result.success) {
              res.json({
                status: 'success',
                message: 'Product removed from cart successfully',
              })
            } else {
              res.status(404).json({
                status: 'error',
                message: 'Product or cart not found',
              })
            }
        } catch (error) {
            console.error(error)
            res.status(500).send('Server error')
        }
    }

    updateCart = async (req, res) => {
        try {
            const { cid } = req.params
            const { products } = req.body
            const result = await this.cartService.updateCart(cid, products)
        
            if (result.success) {
                res.json({
                    status: 'success',
                    message: 'Cart updated successfully',
                })
            } else {
                res.status(404).json({
                    status: 'error',
                    message: 'Cart not found',
                })
            }
        } catch (error) {
            console.error(error)
            res.status(500).send('Server error')
        }
    }

    updateProductQuantity = async (req, res) => {
        try {
            const { cid, pid } = req.params
            const { quantity } = req.body
        
            const result = await this.cartService.updateProductQuantity(cid, pid, quantity)
        
            if (result.success) {
                res.json({
                    status: 'success',
                    message: 'Product quantity updated successfully',
                })
            } else {
                res.status(404).json({
                    status: 'error',
                    message: 'Cart or product not found',
                })
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error')
        }
    }

    deleteAllProducts = async (req, res) => {
        try {
            const { cid } = req.params
            const result = await this.cartService.deleteAllProducts(cid)
        
            if (result.success) {
                return res.json({
                    status: 'success',
                    message: result.message,
                })
            } else {
                return res.status(404).json({
                    status: 'error',
                    message: result.message,
                })
            }
        } catch (error) {
            console.error(error)
            res.status(500).send('Server error')
        }
    }

    addProductToCart2 = async (req, res) => {
        try {
            const { pid } = req.params
            const user = req.session.user
            /* console.log('///////////////', user) */
            if (!user || !user.cart) {
                return res.status(404).json({
                    status: 'error',
                    message: 'User not found or user does not have a cart',
                })
            }
            const cId = user.cart
            
            console.log(cId)
            await this.cartService.addProductToCart(cId, pid)

            res.json({
                status: 'success',
                message: 'Product added to cart successfully',
            })
        } catch (error) {
            console.error(error)
            res.status(500).json({
                status: 'error',
                message: 'Server error',
            })
        }
    }

    purchaseCart = async (req, res) => {
        try {
            const { cid } = req.params
            
            const cart = await this.cartService.getCartById(cid)
            if (!cart) {
                return res.status(404).json({ status: 'error', message: 'Cart not found' })
            }
            const productUpdates = []
            const productsNotPurchased = []
            let totalAmount = 0
            for (const item of cart) {
                const productId = item.product.toString()
                const productArray = await this.productService.getProductById(productId)
                const product = productArray[0]
                const productPrice = product.price
                if (!product) {
                    return res.status(404).json({ status: 'error', message: 'Product not found' })
                }
                if (product.stock < item.quantity) {
                    productsNotPurchased.push(item.product)
                    continue
                    //return res.status(400).json({ status: 'error', message: `Not enough stock for product ${product._id}` })
                }
                product.stock -= item.quantity
                console.log(product)
                productUpdates.push(this.productService.updateProduct(productId,
                    product.title, 
                    product.description, 
                    product.price, 
                    product.thumbnail, 
                    product.code, 
                    product.stock, 
                    product.status, 
                    product.category
                ))

                const quantity = item.quantity
                //console.log("Product Price:", productPrice)
                //console.log("Quantity:", quantity)
                totalAmount += (quantity * productPrice)
            }

            console.log(totalAmount)
            const userEmail = req.session.user.email
            //console.log(userEmail)
            const ticketData = {
                code: 'TICKET-' + Date.now().toString(36).toUpperCase(),
                purchase_datetime: new Date(),
                amount: totalAmount,
                purchaser: userEmail
            }
    
            const ticket = new this.ticketModel(ticketData)
            await ticket.save()

            if (productsNotPurchased.length > 0) {
                cart.products = cart.products.filter(item => !productsNotPurchased.includes(item.product))
                await cart.save()
            } else {
                await this.cartService.deleteAllProducts(cid)
            }
            try {
                await Promise.all(productUpdates)
                return res.status(200).json({ status: 'success', message: 'Stock updated successfully' })
            } catch (error) {
                return res.status(500).json({ status: 'error', message: 'Failed to update stock' })
            }
        } catch (error) {
            console.error(error)
            res.status(500).json({ status: 'error', message: 'Server error' })
        }
    }

}

module.exports = CartController
