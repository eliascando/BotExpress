const nodemailer = require('nodemailer');
const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS, DESTINATARIOS } = require('../../../config');

const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASS
    },
    requireTLS: true,
    tls: {
        rejectUnauthorized: false,
    }
});

const sendMail = async (subject, html) => {
    try{
        await transporter.sendMail({
            from: MAIL_USER,
            to: DESTINATARIOS,
            subject: subject,
            html: html, 
        });
        console.log('Mail sent 📧');
    }
    catch(error){
        throw new Error(error);
    }
}

module.exports = sendMail;