const Config = require('../models/config.model');
const Contact = require('../models/contact.model');

const getConfig = async(number) =>{
    let config = await Config.findOne({ numberContact: number }).exec();

        if(!config){
            let config = new Config({
                numberContact: number,
                gptModel: 'gpt-3.5-turbo',
                hasPersistence: true
            });
            await config.save();

            config = await Config.findOne({ numberContact: number }).exec();
        }
        let gptModel = config.gptModel;
        let hasPersistence = config.hasPersistence;

        //obtener nombre
        let contact = await Contact.findOne({ number: number }).exec();

        let nombre = contact.name;
        let isAdmin = contact.admin;
    
    let configuration = {
        gptModel,
        hasPersistence,
        message: `La configuración actual para *${nombre}* es: \n*Modelo:* ${gptModel} ${hasPersistence ? '\n*Persistencia*: Activa' : '\n*Persistencia*: Inactiva' } ${isAdmin ? '\n*Administrador*: Si' : '' }`
    }
    return (configuration);
}

module.exports = {
    getConfig
}