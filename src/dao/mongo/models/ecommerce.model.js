const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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
const cartsModel = model('carts', cartsSchema)

module.exports = {
    productsModel, cartsModel
}
