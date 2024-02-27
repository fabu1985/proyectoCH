const { UserDao, ProductDao, CartDao, MessageDao } = require('../dao/factory')
const { UserRepository } = require('./user.repository.js')
const usersService = new UserRepository(new UserDao)

const ProductRepository = require('./products.repository.js')
const productService = new ProductRepository(new ProductDao)

const CartRepository = require('./cart.repository.js')
const cartService = new CartRepository(new CartDao)

const MessageRepository = require('./message.repository.js')
const messageService = new MessageRepository(new MessageDao)

module.exports = {
    usersService,
    productService,
    cartService,
    messageService
}