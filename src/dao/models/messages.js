const {Schema, model} = require('mongoose')

/// messages
const messagesCollection = 'Mensajes';
const messagesSchema = Schema({
    id: {
        type: Integer,
        required: true,
        unique: true
    },
    message: String
});
const messagesModel = model(messagesCollection, messagesSchema);

module.exports = {
    messagesModel
}