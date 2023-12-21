const {Schema, model} = require('mongoose')

const messagesCollection = 'messages';
const messagesSchema = Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true
    }
});

const messagesModel = model(messagesCollection, messagesSchema);

// productos
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

/// carritos
const cartsCollection = 'carts';
const cartsSchema = Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    quantity: String
});
const cartsModel = model(cartsCollection, cartsSchema);

module.exports = {
    messagesModel, productsModel, cartsModel
}
