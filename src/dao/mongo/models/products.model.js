const {Schema, model} = require('mongoose')
const productsCollection = 'products';
const productsSchema = Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    price: String,
    stock: String,
    thumbnail: String,
    category: String,
    code: {
        type: String,
        required: true,
        unique: true
    },
    status: Boolean,
    owner: {
        type: String,
        default: 'admin'
    }
});

const productsModel = model(productsCollection, productsSchema);

module.exports = {
    productsModel
}
