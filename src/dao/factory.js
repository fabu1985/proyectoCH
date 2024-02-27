const { configObject: {persistence} } = require('../config/index')
let UserDao
let ProductDao
let CartDao
let MessageDao


switch (persistence) {
    case 'MONGO':
        const UserDaoMongo = require('./mongo/usersDaoMongo')
        UserDao = UserDaoMongo
        const ProductDaoMongo = require('./mongo/productsDaoMongo')
        ProductDao = ProductDaoMongo
        const CartDaoMongo = require('./mongo/cartDaoMongo')
        CartDao = CartDaoMongo
        const MessageDaoMongo = require('./mongo/messageDaoMongo')
        MessageDao = MessageDaoMongo
        break;
    case 'FILE':
        const UserDaoFile = require('./fileSystem/productManager')
        UserDao = UserDaoFile
        const ProductDaoFile = require('./mongo/productsDaoMongo')
        ProductDao = ProductDaoFile
        break;
    default:
        break;
}

module.exports = {
    ProductDao,
    UserDao,
    MessageDao,
    CartDao
}