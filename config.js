require('dotenv').config()

const enviroment = {
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '',
    MONGODB_URL : process.env.MONGODB_URL || '',
    MAIL_HOST : process.env.MAIL_HOST || '',
    MAIL_PORT : process.env.MAIL_PORT || '',
    MAIL_USER : process.env.MAIL_USER || '',
    MAIL_PASS : process.env.MAIL_PASS || '',
    DESTINATARIOS : process.env.DESTINATARIOS || '',
}

module.exports = enviroment;
