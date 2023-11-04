const client = require("./app/services/whatsapp");
const sendMail = require('./app/services/mail');
const appMessage = require('./app/app');

console.log("Bot Express 🤖")

//inicializando cliente de whatsapp
client.initialize();

//escuchando mensajes
client.on('message', async(msg) => {    
    appMessage(msg, client);
});

//por si se desconecta
client.on('disconnected', async(reason) => {
    let html = `
        <h1>⚠️ El servidor se ha caído o ha ocurrido algo con whatsapp, revisar! ⚠️</h1>
        <h2>Detalles:</h2>
        <p>${reason}</p>
    `;
    let subject = "WhatsApp Bot - Disconnected";
    await sendMail(subject, html);
});
