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
