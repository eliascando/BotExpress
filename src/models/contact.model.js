const { Schema, model } = require('mongoose');

const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true,
        unique: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    birthday: {
        type: Date,
        required: false
    },
    sex: {
        type: String,
        required: false
    },
});

module.exports = model('Contact', contactSchema, 'contacts');