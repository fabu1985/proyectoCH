const {Schema, model} = require('mongoose')
const cartCollection = 'carts';
const cartSchema = Schema({
    products: {
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'products',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }]
    }
});

const cartModel = model(cartCollection, cartSchema);

module.exports = {
    cartModel
}
