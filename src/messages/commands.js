const { 
    cleanConversation, 
    cleanAllConversations,
    persistenceOff,
    persistenceOn,
    gpt3Model,
    gpt4Model
} = require('./../controllers/conversation.controller');
const { obtenerCantidadContactos } = require('./../controllers/contact.controller');
const { getConfig } = require('./../controllers/config.controller');

const commandsAdmin = {
    "/clean": cleanConversation,
    "/cleanall": cleanAllConversations,
    "/contactos": obtenerCantidadContactos,
    "/persistence-off": persistenceOff,
    "/persistence-on": persistenceOn,
    "/gpt3": gpt3Model,
    "/gpt4": gpt4Model,
    "/config": getConfig
}

const commandsPublic = {
    "/clean": cleanConversation,
    "/config": getConfig
}

module.exports = {
    commandsAdmin,
    commandsPublic
};