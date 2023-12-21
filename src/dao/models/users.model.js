const {Schema, model} = require('mongoose')

const usersCollection = 'Usuarios';
const UsersSchema = Schema({
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

const usersModel = model(usersCollection, UsersSchema);

// productos
const productsCollection = 'Productos';
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
    usersModel, productsModel
}
