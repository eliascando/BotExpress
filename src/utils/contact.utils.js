const extractVCardDetails = (vCardString) => {
    // Extraer el nombre completo
    const fullNameMatch = vCardString.match(/^FN:(.*)$/m);
    const fullName = fullNameMatch ? fullNameMatch[1] : null;
    
    //extraer solo el primer nombre antes del espacio
    const firstName = fullName.split(" ")[0];

    // Intentar extraer el número de teléfono con diferentes etiquetas
    let phoneNumber = null;
    const phoneMatch1 = vCardString.match(/waid=(\d+):(\+\d+ \d+ \d+ \d+)$/m);
    const phoneMatch2 = vCardString.match(/TEL;TYPE=CELL,VOICE:(\+\d+ \d+ \d+ \d+)$/m);
    const phoneMatch3 = vCardString.match(/TEL;TYPE=VOICE,CELL:(\+\d+ \d+ \d+ \d+)$/m);
    
    // Evaluar cuál etiqueta fue encontrada y asignar el número de teléfono correspondiente
    if (phoneMatch1) {
        phoneNumber = `${phoneMatch1[1]}@c.us`;
    } else if (phoneMatch2) {
        phoneNumber = `${phoneMatch2[1]}@c.us`;
    } else if (phoneMatch3) {
        phoneNumber = `${phoneMatch3[1]}@c.us`;
    }

    // Extraer la fecha de cumpleaños
    const birthdayMatch = vCardString.match(/^BDAY;value=date:(\d{4}-\d{2}-\d{2})$/m);
    const birthday = birthdayMatch ? birthdayMatch[1] : null;

    // Retornar un objeto con nombre, número de teléfono y fecha de cumpleaños
    return {
        firstName,
        phoneNumber,
        birthday
    };
}  

module.exports = extractVCardDetails;
  