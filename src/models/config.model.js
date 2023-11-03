const { Schema, model } = require('mongoose');

const config = new Schema({
    numberContact: {
        type: String,
        required: true
    },
    gptModel: {
        type: String,
        required: true
    },
    hasPersistence: {
        type: Boolean,
        required: true
    }
});

module.exports = model('Config', config, 'configs');