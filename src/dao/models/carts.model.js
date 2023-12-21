const {Schema, model} = require('mongoose')

/// carritos
const cartsCollection = 'Carrito';
const cartsSchema = Schema({
    id: {
        type: Integer,
        required: true,
        unique: true
    },
    quantity: Integer
});
const cartsModel = model(cartsCollection, cartsSchema);

module.exports = {
    cartsModel
}