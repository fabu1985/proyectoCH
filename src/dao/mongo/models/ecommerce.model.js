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

const messagesModel = model(messagesCollection, messagesSchema)

/*const usersCollection = 'Usuarios'
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
    },
    role: {
        type: String,
        enum: ['user', 'user_premium', 'admin'],
        default: 'user'
    },
    atCreated: {
        type: Date,
        default: Date()
    }
});
usersSchema.plugin(mongoosePaginate)
const usersModel = model(usersCollection, usersSchema)*/

const ticketCollection = 'tickets';
const ticketSchema = new Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    purchase_datetime: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true,
    },
    purchaser: {
        type: String,
        required: true
    }
})

const ticketModel = model(ticketCollection, ticketSchema);

module.exports = {
    messagesModel, ticketModel
}
