const { OPENAI_API_KEY } = require('../../../config');
const { OpenAI } = require('openai');
const { availableFunctions, descriptionFunctions } = require('../addons/functions.addons');

const openai = new OpenAI({apiKey: OPENAI_API_KEY});

const getResponse = async(newMessage, gptModel) => {
    try{
        let response = await openai.chat.completions.create({
            model: gptModel,
            messages: newMessage,
            functions: descriptionFunctions,
            function_call: "auto"
        });

        let messageContent = response.choices[0].message;

        if (messageContent) {
            if(messageContent.function_call){
                const functionName = messageContent.function_call.name;
                const callFunction = availableFunctions[functionName];
                const functionParams = JSON.parse(messageContent.function_call.arguments);
                const functionResponse = await callFunction(functionParams);
                newMessage.push(messageContent);
                newMessage.push({
                    role: "function",
                    name: functionName,
                    content: JSON.stringify(functionResponse)
                });

                const secondResponse = await openai.chat.completions.create({
                    model: gptModel,
                    messages: newMessage
                });

                return secondResponse.choices[0].message;
            }else{
                return messageContent;
            }
        } else {
            return {
                role: 'assistant',
                content: `Error al obtener la respuesta`
            }
        }
    }catch(error){
        throw error;
    }
}

module.exports = getResponse;