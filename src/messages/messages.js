const mensajeHelpAdmin = `Hola, soy Bot Express y estoy para ayudarte, estos son los comandos que puedes usar:\n_Nota:_ Los comandos pueden tener argumentos estos pueden ser:\n*me*: para referirse a si mismo\n*numero celular (593999999999)*: en caso de querer modificar la configuración de un contacto\n\n*Comandos disponibles:*\n*/clean*: Limpia la conversación actual.\n*/cleanall*: Limpia las conversaciones de todos los contactos ⚠️.\n*/contactos*: Muestra la cantidad de contactos registrados.\n*/persistence-off <argumento>*: Desactiva la persistencia de la conversación.\n*/persistence-on <argumento>*: Activa la persistencia de la conversación.\n*/gpt3 <argumento>*: Activa el modelo GPT-3.5.\n*/gpt4 <argumento>*: Activa el modelo GPT-4.\n*/config <argumento>*: Obtiene la configuración actual.`;

const mensajeHelpPublic = `Hola, soy Bot Express y estoy para ayudarte, estos son los comandos que puedes usar:\n\n*Comandos disponibles:*\n*/clean*: Limpia la conversación actual.\n*/config me*: Obtiene la configuración actual.`;

module.exports = {
    mensajeHelpAdmin,
    mensajeHelpPublic
}