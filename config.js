require('dotenv').config()

const enviroment = {
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '',
    MONGODB_URL : process.env.MONGODB_URL || '',
    MAIL_HOST : process.env.MAIL_HOST || '',
    MAIL_PORT : process.env.MAIL_PORT || '',
    MAIL_USER : process.env.MAIL_USER || '',
    MAIL_PASS : process.env.MAIL_PASS || '',
    DESTINATARIOS : process.env.DESTINATARIOS || '',
    WEATHER_API_URL: process.env.WEATHER_API_URL || '',
    WEATHER_API_KEY: process.env.WEATHER_API_KEY || '',
    EXCHANGE_API_URL: process.env.EXCHANGE_API_URL || '',
    EXCHANGE_API_KEY: process.env.EXCHANGE_API_KEY || '',
}

//validacion cuando no se definen las variables de entorno
const keys = Object.keys(enviroment);
keys.forEach(key => {
    if(!enviroment[key] || enviroment[key] === ''){
        throw new Error(`${key} no definido`);
    }
});

module.exports = enviroment;
