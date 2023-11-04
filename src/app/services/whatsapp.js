const qrcode = require('qrcode-terminal');
const sendMail = require('./mail');

const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
    console.log('Authenticated 🔑');
});

client.on('ready', () => {
    console.log('Client is ready 🚀');
    console.log("Listening messages... 📩");
});

module.exports = client;
