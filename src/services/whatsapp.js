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
    
    let html = `
        <h1>✅ El servidor se ha iniciado correctamente ✅</h1>
    `;
    let subject = "WhatsApp Bot - Connected";
    sendMail(subject, html);
});

client.initialize();

module.exports = client;
