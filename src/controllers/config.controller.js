const Config = require('../models/config.model');

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
    
    let configuration = {
        gptModel,
        hasPersistence,
        message: `La configuración actual es: \nModelo: ${gptModel} ${hasPersistence ? '\nPersistencia activada' : '\nPersistencia desactivada'}`
    }
    return (configuration);
}

module.exports = {
    getConfig
}