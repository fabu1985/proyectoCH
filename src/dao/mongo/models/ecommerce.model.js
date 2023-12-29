const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const messagesCollection = 'messages';
const messagesSchema = Schema({
    user: {
        type: String,
        required: true
    },
    message: String
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

productsSchema.plugin(mongoosePaginate);
const productsModel = model(productsCollection, productsSchema);

/// carritos
/*
//este anda bien
const cartsCollection = 'carts';
const cartsSchema = Schema({
    products: String
});
const cartsModel = model(cartsCollection, cartsSchema);*/


// del profe en clases
const cartsSchema = new Schema({
    products: {
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'products'
            }
        }]
    }
});
cartsSchema.pre('findOne', function () {
    this.populate('products.product')
});
cartsSchema.plugin(mongoosePaginate);

const cartsModel = model('carts', cartsSchema)
//// hasta aca del profe en clsaes para carts
const usersCollection = 'Usuarios'
const usersSchema = Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    }
});
usersSchema.plugin(mongoosePaginate)
const usersModel = model(usersCollection, usersSchema)

module.exports = {
    messagesModel, productsModel, cartsModel, usersModel
}
