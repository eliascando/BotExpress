const mongoose = require('mongoose');
const { MONGODB_URL } = require('../../../config');

const connection = async () => {
    try{
        await mongoose.connect(MONGODB_URL);
        console.log('Database connected 💾');
    }
    catch(error){
        throw new Error(error);
    }
}

module.exports = connection;