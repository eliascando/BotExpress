# Bot Express

Este es un proyecto de node que implementa las librerías de [whatsapp-web.js](https://wwebjs.dev/), [OpenAI](https://platform.openai.com/docs/libraries) y [Mongoose](https://mongoosejs.com/) para automatizar las respuestas de whatsapp.

### Mongoose
La librería de mongoose se utiliza para modelar la base de datos de MongoDB y validar por usuarios, crear usuarios o contactos, tener persistencia en los chats y guardar configuraciones respecto al tipo de modelo o si se persiste o no un chat.

### OpenAI
La librería de OpenAI se utiliza para hacer peticiones a la api y recibir respuestas de GPT mediante el modelo gpt-3.5-turbo por defecto, este en cada usuario es modificable para utilizar gpt-4 por parte del usuario administrador.

### Whatsapp-Web.js

Se utiliza también la librería open source para utilizar un cliente de whatsapp y hacer uso de una cuenta de whatsapp para contestar los mensajes que se reciben.

### Otros
Tiene manejo de errores y envío de correos cuando ocurren excepciones inesperadas o desconexiones por parte del cliente de whatsapp.

### Captura del chat
<img src="https://github.com/eliascando/BotExpress/assets/75767835/cebb6335-4074-49d4-8493-58aa66cc6a61" width="350px">

### Logotipo de BotExpress
<img src="https://github.com/eliascando/BotExpress/assets/75767835/75afd9cc-57a1-406c-8bbe-a89ecd8e0715" width="350px">




### Para ejecutar el proyecto en desarrollo

1. Debe clonar el proyecto en su directorio
```
git clone https://github.com/eliascando/BotExpress.git
```
2. Moverse al directorio donde se clonó el proyecto
```
cd C://Users/user/BotExpress
```
3. Crear el fichero ``.env`` en la carpeta raíz del proyecto y definir las variables requeridas para el funcionamiento del proyecto.
4. Instalar las dependencias con 
```
npm i
```
5. Finalmente se puede ejecutar el proyecto en modo desarrollo
```
npm run dev
```
> **Nota:** Debe tener instalado git y node.js para poder instalar las dependencias y ejecutar el proyecto
