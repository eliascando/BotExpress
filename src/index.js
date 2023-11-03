const client = require("./services/whatsapp");
const extractVCardDetails = require('../src/utils/contact.utils')
const { saveContact, validarContacto } = require('./controllers/contact.controller');
const { newMessage } = require('./controllers/conversation.controller');
const connection = require('./database/connection');
const {commandsAdmin, commandsPublic} = require('./messages/commands');
const { mensajeHelpAdmin, mensajeHelpPublic } = require('./messages/messages');
const sendMail = require('./services/mail');

console.log("Bot Express 🤖")

//conexion a la base de datos
connection();

//conexion a whatsapp


//escuchando mensajes
client.on('message', async msg => {
    const contacto = await validarContacto(msg.from);
    
    if(contacto.error){
        client.sendMessage(msg.from,"No estás registrado en la base de datos para usar el bot, contacta al administrador");
    }else{
        let contact = contacto.contactoFormateado;
        if(contact.admin){
            if(msg.type === "vcard"){
                try{
                    let contacto = extractVCardDetails(msg.body);           
                    
                    let formatContact = {
                        number: contacto.phoneNumber,
                        name: contacto.firstName,
                        admin: false,
                        birthday: contacto.birthday
                    }
                    
                    await saveContact(formatContact);
                    client.sendMessage(contact.number,"Contacto guardado");
                }catch(error){
                    client.sendMessage(contact.number,"Ocurrió un error al guardar el contacto");
                }
            }else if(msg.type === "chat"){
                if(msg.body.startsWith("/")){
                    if(msg.body === "/help"){
                        client.sendMessage(contact.number, mensajeHelpAdmin);
                    }else{
                        //extraer el comando y el argumento
                        const command = msg.body.split(" ")[0];
                        const argument = msg.body.split(" ")[1];
                        
                        if(commandsAdmin[command]){
                            try{
                                if(argument === "me"){
                                    let response = await commandsAdmin[command](contact.number);
                                    client.sendMessage(contact.number, response.message);
                                }else{
                                    let response = await commandsAdmin[command](argument+"@c.us");
                                    client.sendMessage(contact.number, response.message);
                                }
                            }catch(error){
                                client.sendMessage(contact.number, "Ocurrió un error al ejecutar el comando");
                            }
                        }else{
                            client.sendMessage(contact.number, "Comando no encontrado");
                        }
                    }
                }else{
                    let response = await newMessage({ contact, message: msg.body });
                    client.sendMessage(contact.number, response);
                }
            }
        }else{
            if(msg.type === "chat"){
                if(msg.body.startsWith("/")){
                    if(msg.body === "/help"){
                        client.sendMessage(contact.number, mensajeHelpPublic);
                    }else{
                        //extraer el comando y el argumento
                        const command = msg.body.split(" ")[0];
                        const argument = msg.body.split(" ")[1];
    
                        if(commandsPublic[command]){
                            try{
                                if(argument){
                                    let response = await commandsAdmin[command](argument);
                                    client.sendMessage(contact.number, response.message);
                                }else{
                                    let response = await commandsAdmin[command](contact.number);
                                    client.sendMessage(contact.number, response.message);
                                }
                            }
                            catch(error){
                                client.sendMessage(contact.number, "Ocurrió un error al ejecutar el comando");
                            }
                        }else{
                            client.sendMessage(contact.number, "Comando no encontrado");
                        }
                    }
                }else{
                    let response = await newMessage({ contact, message: msg.body });
                    client.sendMessage(contact.number, response);
                }
            }
        }
    }
});

//por si se desconecta
client.on('disconnected', (reason) => {
    let html = `
        <h1>⚠️ El servidor se ha caído o ha ocurrido algo con whatsapp, revisar! ⚠️</h1>
        <h2>Detalles:</h2>
        <p>${reason}</p>
    `;
    let subject = "WhatsApp Bot - Disconnected";
    sendMail(subject, html);
});

//por si hay un error no capturado
process.on('uncaughtException', (err) => {
    console.error('Hubo un error no capturado:', err);
    sendMail('Error inesperado', `<h1>Error inesperado</h1><p>${err}</p>`).catch(console.error);
    // Realiza una limpieza si es necesario y detén el proceso con un código de salida diferente de cero.
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Promesa rechazada no manejada:', promise, 'razón:', reason);
    sendMail('Rechazo de Promesa no manejado', `<h1>Rechazo de Promesa no manejado</h1><p>${reason}</p>`).catch(console.error);
    // Opcional: Puedes decidir terminar el proceso o no dependiendo de la gravedad del error.
});
