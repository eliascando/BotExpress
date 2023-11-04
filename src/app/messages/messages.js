const mensajeHelpAdmin = "*Comandos disponibles:*"
                        +"\n✦*/clean <argumento>*: Limpia la conversación actual."
                        +"\n✦*/getcontacts me*: Obtiene la lista de contactos registrados"
                        +"\n✦*/countcontacts me*: Muestra la cantidad de contactos registrados."
                        +"\n✦*/persistence-off <argumento>*: Desactiva la persistencia de la conversación."
                        +"\n✦*/persistence-on <argumento>*: Activa la persistencia de la conversación."
                        +"\n✦*/gpt3 <argumento>*: Activa el modelo GPT-3.5."
                        +"\n✦*/gpt4 <argumento>*: Activa el modelo GPT-4."
                        +"\n✦*/config <argumento>*: Obtiene la configuración actual."
                        +"\n✦*/count <argumento>*: Obtiene la cantidad de mensajes en la conversación."
                        +"\n\n⚠️ *Usar discreta y responsablemente* ⚠️"
                        +"\n✦*/cleanall me*: Limpia las conversaciones de todos los contactos."
                        +"\n\n_Nota:_ Los comandos pueden tener argumentos estos pueden ser:"
                        +"\n-*me*: para referirse a si mismo"
                        +"\n-*numero celular (0999999999)*: en caso de querer modificar la configuración de un contacto en específico";

const mensajeHelpPublic ="*Comandos disponibles:*"
                        +"\n✦*/clean me*: Limpia la conversación actual."
                        +"\n✦*/config me*: Obtiene la configuración actual."
                        +"\n✦*/count me*: Obtiene la cantidad de mensajes en la conversación.";


module.exports = {
    mensajeHelpAdmin,
    mensajeHelpPublic
}