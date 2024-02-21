const { UserDao } = require('../dao/factory.js')
const { UserRepository } = require('./user.repository.js')
const usersService = new UserRepository(new UserDao())

const { ProductDao } = require('../dao/factory.js')
const ProductRepository = require('./products.repository.js')

const productService = new ProductRepository(new ProductDao)

module.exports = {
    usersService,
    productService
}