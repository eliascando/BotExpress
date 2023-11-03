const { OPENAI_API_KEY } = require('../../config');
const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY
});

const getResponse = async(newMessage, gptModel) => {
    try{
        let response = await openai.chat.completions.create({
            model: gptModel,
            messages: newMessage,
        });

        let messageContent = response.choices[0].message;

        if (messageContent && messageContent.content) {
            return messageContent;
        } else {
            return {
                role: 'assistant',
                content: 'Error al obtener respuesta, ¿puedes reformular tu pregunta?'
            }
        }
    }catch(error){
        throw error;
    }
}

module.exports = getResponse;