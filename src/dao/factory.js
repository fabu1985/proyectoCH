const { configObject: {persistence} } = require('../config/index.js')
let UserDao
let ProductDao


switch (persistence) {
    case 'MONGO':
        const UserDaoMongo = require('./mongo/usersDaoMongo.js')
        UserDao = UserDaoMongo
        const ProductDaoMongo = require('./mongo/productsDaoMongo.js')
        ProductDao = ProductDaoMongo
        break;
    case 'FILE':
        const UserDaoFile = require('./fileSystem/productManager.js')
        UserDao = UserDaoFile
        const ProductDaoFile = require('./mongo/productsDaoMongo.js')
        ProductDao = ProductDaoFile
        break;
    default:
        break;
}

module.exports = {
    ProductDao,
    UserDao
}