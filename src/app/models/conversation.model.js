const { Schema, model } = require('mongoose');

const conversationSchema = new Schema({
    number: {
        type: String,
        required: true
    },
    messages: {
        type: Array,
        required: true
    }
});

module.exports = model('Conversation', conversationSchema, 'conversations');