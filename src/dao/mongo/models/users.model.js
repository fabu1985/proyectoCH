const {Schema, model} = require('mongoose')

const documentSchema = new Schema({
    name: { type: String },
    type: { type: String },
    reference: { type: String }
  });

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
    },
    lastupdated:{ type: Date,   required: true, default: Date.now()},
    documents:  { type: [documentSchema] }
});

const usersModel = model(usersCollection, usersSchema);

module.exports = {
    usersModel
}
