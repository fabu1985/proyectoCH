const {Schema, model} = require('mongoose')
const productsCollection = 'products';
const productsSchema = Schema({
    title: {
        type: String,
        required: true
    },
    category: String,
    description: String,
    price: String,
    thumbnail: String,
    code: {
        type: String,
        required: true,
        unique: true
    },
    stock: String,
    status: Boolean
});

const productsModel = model(productsCollection, productsSchema);

module.exports = {
    productsModel
}
