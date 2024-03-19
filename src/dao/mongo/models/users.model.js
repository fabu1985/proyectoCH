const {Schema, model} = require('mongoose')
const usersCollection = 'users';
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
        enum: ['user', 'premium', 'admin'],
        default: 'user'
    },
    atCreated: {
        type: Date,
        default: Date()
    }
});

const usersModel = model(usersCollection, usersSchema);

module.exports = {
    usersModel
}
