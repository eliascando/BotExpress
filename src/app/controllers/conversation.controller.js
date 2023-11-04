const Conversation = require('../models/conversation.model');
const Config = require('../models/config.model');
const { getConfig } = require('./config.controller');
const getResponse = require('../services/openai');
const { formatNumber } = require('../utils/contact.utils');

const newMessage = async (newMessage) => {
    const { contact, message } = newMessage;
    try{
        let { gptModel, hasPersistence } = await getConfig(contact.number);

        if(hasPersistence){
            let conversation = await Conversation.findOne({ number: contact.number }).exec();

            if(conversation){
                let messages = conversation.messages;

                let nuevoMensaje = {
                    role: "user",
                    content: message
                }

                messages.push(nuevoMensaje);
                let response = await getResponse(messages, gptModel);
                messages.push(response);

                await Conversation.findOneAndUpdate({ number: contact.number }, { messages: messages }).exec();
                return (response.content);
            }else{
                let primeraConversacion = [
                    {
                        role: "system",
                        content: `Eres un asistente personal, y te llamas Bot Express, el nombre de tu usuario es ${contact.name} el cual es su nombre real ${contact.birthday !== null ? "y su cumpleaños es " + contact.birthday : ""}, recuerda ser amable con los usuarios y ayudarlos en lo que necesiten sin llegar a ser tan robot, recuerda que eres un asistente personal y no un robot, si el usuario te pregunta que puedes hacer, le puedes decir lo que sabes hacer y adicionalmente le indicas el comando /help.`
                    },
                    {
                        role: "system",
                        content:"Only use the functions you have been provided with."
                    }
                ];	

                let nuevoMensaje = {
                    role: "user",
                    content: message
                }

                primeraConversacion.push(nuevoMensaje);
                let response = await getResponse(primeraConversacion, gptModel);
                primeraConversacion.push(response);

                let conversation = new Conversation({
                    number: contact.number,
                    messages: primeraConversacion
                });

                await conversation.save();
                return (response.content);
            }
        }else{
            cleanConversation(contact.number);
            let messages = [
                {
                    role: "system",
                    content: `Eres un bot que responde una pregunta a la vez es decir no tienes memoria, eres como dory de buscando a nemo multiplicado por mil y te llamas Bot Express, el nombre de tu usuario es ${contact.name} el cual es su nombre real ${contact.birthday !== null ? "y su cumpleaños es " + contact.birthday : ""}, recuerda ser amable con los usuarios y ayudarlos en lo que necesiten, si el usuario te pregunta que puedes hacer, le puedes decir lo que sabes hacer y adicionalmente le indicas el comando /help.`
                },
                {
                    role: "system",
                    content:"Only use the functions you have been provided with."
                }
            ];

            let nuevoMensaje = {
                role: "user",
                content: message
            }

            messages.push(nuevoMensaje);
            let response = await getResponse(messages, gptModel);
            messages.push(response);

            return (response.content);
        }
    }catch(error){
        throw new Error(error);
    }
}

const cleanConversation = async (number) => {
    try{
        await Conversation.findOneAndDelete({ number: number }).exec();
        return ({
            message: "Conversación borrada"
        });
    }catch(error){
        return ({
            message: "Conversación no encontrada"
        });
    }
}

const cleanAllConversations = async () => {
    try{
        await Conversation.deleteMany({}).exec();
        return ({
            message: "Conversaciones borradas"
        });
    }catch(error){
        throw new Error(error);
    }
}

const persistenceOff = async (number) => {
    try{
        await Config.findOneAndUpdate({ numberContact: number }, { hasPersistence: false }).exec();
        return ({
            message: `Persistencia desactivada para el número ${formatNumber(number)}`
        });
    }
    catch(error){
        throw new Error(error);
    }
}

const persistenceOn = async (number) => {
    try{
        await Config.findOneAndUpdate({ numberContact: number }, { hasPersistence: true }).exec();
        return ({
            message: `Persistencia activada para el número ${formatNumber(number)}`
        });
    }
    catch(error){
        throw new Error(error);
    }
}

const gpt4Model = async(numero) => {
    try{
        await Config.findOneAndUpdate({ numberContact: numero }, { gptModel: 'gpt-4' }).exec();
        return ({
            message: `Modelo cambiado a GPT-4 para el número ${formatNumber(numero)}`
        });
    }
    catch(error){
        throw new Error(error);
    }
}

const gpt3Model = async(numero) => {
    try{
        await Config.findOneAndUpdate({ numberContact: numero }, { gptModel: 'gpt-3.5-turbo' }).exec();
        return ({
            message: `Modelo cambiado a GPT-3.5 para el número ${formatNumber(numero)}`
        });
    }
    catch(error){
        throw new Error(error);
    }
}

const countMessages = async (numero) => {
    try{
        let conversation = await Conversation.findOne({ number: numero }).exec();
        let conversationMessages = conversation.messages;
        let cantidad = conversationMessages.length;
        return ({ message: `Hay ${cantidad} mensajes en esta conversación`});
    }catch(error){
        return ({ message: `No hay mensajes en esta conversación`});
    }
}

module.exports = {
    newMessage,
    cleanConversation,
    cleanAllConversations,
    persistenceOff,
    persistenceOn,
    gpt4Model,
    gpt3Model,
    countMessages
};