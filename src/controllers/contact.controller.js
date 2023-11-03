const Contact = require('../models/contact.model');
const Config = require('../models/config.model');

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

const getContacts = async () => {
    try{
        let contacts = await Contact.find({}).sort({ name: 1 }).exec();

        let contactos = contacts.map((contact) => ({
            name: contact.name,
            number: contact.number,
            admin: contact.admin,
            birthday: contact.birthday,
            sex: contact.sex
        }));

        return (contactos);
    }catch(error){
        res.status(500).send({ error });
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