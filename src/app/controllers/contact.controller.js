const Contact = require('../models/contact.model');
const Config = require('../models/config.model');
const { formatNumber } = require('../utils/contact.utils');

const saveContact = async (contact) => {
    try{
        let newContact = new Contact(contact);
        let config = new Config({
            numberContact: contact.number,
            gptModel: 'gpt-3.5-turbo',
            hasPersistence: true
        });
        await newContact.save();
        await config.save();
        return ({ contact });
    }catch(error){
        throw new Error(error);
    }
}

const getContacts = async (number) => {
    try {
        let contacts = await Contact.find({}).sort({ name: 1 }).exec();

        let contactList = contacts.map(contact => 
            `\nNombre: *${contact.name}*\nNúmero: *${formatNumber(contact.number)}*${contact.admin ? '\n*Administrador*: Sí' : ''}\n-------------------------`
        ).join('');

        return ({ message: `*Lista de contactos:*\n${contactList}`});
    }catch(error){
        throw new Error(error);
    }
}

const validarContacto = async(number) => {
    try{
        let contact = await Contact.findOne({ number: number }).exec();
        if(contact){
            let contactoFormateado = {
                name: contact.name,
                number: contact.number,
                admin: contact.admin,
                birthday: contact.birthday,
                sex: contact.sex 
            }
            return ({ contactoFormateado });
        }else{
            return ({
                error: "El contacto no existe"
            });
        }
    }
    catch(error){
        throw new Error(error);
    }
}

const obtenerCantidadContactos = async(number) => {
    try{
        let cantidad = await Contact.countDocuments({}).exec();
        return ({ message: `Hay ${cantidad} contactos registrados`});
    }catch(error){
        throw new Error(error);
    }
}

module.exports = {
    getContacts,
    saveContact,
    validarContacto,
    obtenerCantidadContactos
}