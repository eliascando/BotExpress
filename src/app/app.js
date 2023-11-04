const connection = require('./database/connection');
const { newMessage } = require('./controllers/conversation.controller');
const { saveContact, validarContacto } = require('./controllers/contact.controller');
const {commandsAdmin, commandsPublic} = require('./messages/commands');
const { mensajeHelpAdmin, mensajeHelpPublic } = require('./messages/messages');
const { extractVCardDetails }= require('./utils/contact.utils')

//inicia la conexión a la base de datos
connection();

const appMessage = async(msg, client) => {
    const contacto = await validarContacto(msg.from);

    if(contacto.error){
        client.sendMessage(msg.from,"No estás registrado en la base de datos para usar el bot, contacta al administrador");
    }else{
        let contact = contacto.contactoFormateado;

        if(msg.type === "chat"){
            if(msg.body.startsWith("/")){
                if(msg.body === "/help"){
                    client.sendMessage(contact.number, contact.admin ? mensajeHelpAdmin : mensajeHelpPublic);
                }else{
                    const command = msg.body.split(" ")[0];
                    const argument = msg.body.split(" ")[1];

                    let commands = contact.admin ? commandsAdmin : commandsPublic;

                    if(commands[command]){
                        try{
                            if(argument === "me"){
                                let response = await commands[command](contact.number);
                                client.sendMessage(contact.number, response.message);
                            }else if(contact.admin && argument.startsWith("0")){
                                let argumento = argument.substring(1);
                                let response = await commands[command]("593"+argumento+"@c.us");
                                client.sendMessage(contact.number, response.message);
                            }else{
                                client.sendMessage(contact.number, "Argumento no válido");
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
                try{
                    let response = await newMessage({ contact, message: msg.body });
                    client.sendMessage(contact.number, response);
                }catch(error){
                    client.sendMessage(contact.number, "Ocurrió un error al enviar el mensaje");
                }
            }
        } else{
            if(msg.type === "vcard" && contact.admin){
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
            }
        }
    }
}

module.exports = appMessage;