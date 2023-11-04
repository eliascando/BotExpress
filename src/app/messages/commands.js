const { 
    cleanConversation, 
    cleanAllConversations,
    persistenceOff,
    persistenceOn,
    gpt3Model,
    gpt4Model,
    countMessages
} = require('./../controllers/conversation.controller');
const { obtenerCantidadContactos, getContacts } = require('./../controllers/contact.controller');
const { getConfig } = require('./../controllers/config.controller');

const commandsAdmin = {
    "/clean": cleanConversation,
    "/cleanall": cleanAllConversations,
    "/countcontacts": obtenerCantidadContactos,
    "/getcontacts": getContacts,
    "/persistence-off": persistenceOff,
    "/persistence-on": persistenceOn,
    "/gpt3": gpt3Model,
    "/gpt4": gpt4Model,
    "/config": getConfig,
    "/count": countMessages
}

const commandsPublic = {
    "/clean": cleanConversation,
    "/config": getConfig,
    "/count": countMessages
}

module.exports = {
    commandsAdmin,
    commandsPublic
};