const { 
    WEATHER_API_URL, 
    WEATHER_API_KEY, 
    EXCHANGE_API_KEY, 
    EXCHANGE_API_URL
} = require('../../../config');
const fx = require('../utils/money.utils');

// PETICIONES QUE SOPORTAN LOS ADDONS
const getBaseRates = async() => {
    try{
        let data = await fetch(`${EXCHANGE_API_URL}latest.json?app_id=${EXCHANGE_API_KEY}`);

        let response = await data.json();

        if(response.error){
            throw new Error(response.error);
        }else{
            return {rates: response.rates,base: response.base, date: response.timestamp};
        }

    }catch{
        throw new Error('Hubo un error al obtener los tipos de cambio');
    }
}

// PETICIONES PRINCIPALES
const getWeather = async ({location}) => {
    try{
        let response = await fetch(`${WEATHER_API_URL}current.json?q=${location}&key=${WEATHER_API_KEY}`,
        {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            }
        });
    
        let data = await response.json();
    
        if(data.error || !data.current || !data.location){
            return { error: true, message: "Hubo un error al obtener el clima" };
        }else{
            return data;
        }
    }catch(error){
        return { error: true, message: "Hubo un error al obtener el clima" };
    }
}

const convertMoney = async ({amount, from, to}) => {
    try{
        let baseRates = await getBaseRates();

        fx.rates = baseRates.rates;
        fx.base = baseRates.base;
        let fechaCorte = new Date(baseRates.date * 1000);
        fx.settings = {
            from,
            to
        };
        let converted = fx.convert(amount);

        return {converted, fechaCorte};
    }catch(error){
        return { error: true, message: "Hubo un error al convertir la divisa" };
    }
}

const availableFunctions = {
    get_current_weather: getWeather,
    convert_money: convertMoney
};

const descriptionFunctions = [
    {
        "name": "get_current_weather",
        "description": "Get the current weather in a given location",
        "parameters": {
            "type": "object",
            "properties": {
                "location": {
                    "type": "string",
                    "description": "The city to looking for, e.g. Guayaquil",
                },
                "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]},
            },
            "required": ["location"],
        },
    },
    {
        "name": "convert_money",
        "description": "Convert an amount of money from one currency to another",
        "parameters": {
            "type": "object",
            "properties": {
                "amount": {
                    "type": "number",
                    "description": "The amount of money to convert",
                },
                "from": {
                    "type": "string",
                    "description": "The currency code to convert from, e.g. USD",
                },
                "to": {
                    "type": "string",
                    "description": "The currency code to convert to, e.g. EUR",
                },
            },
            "required": ["amount", "from", "to"],
        },
    },
]

module.exports = {
    availableFunctions,
    descriptionFunctions
};