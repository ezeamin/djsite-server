const DB = require("../models/fechas");

const checkAvailability = async (dateProp,turnoProp) => {
    const date = new Date(dateProp);
    //convert to UTC
    date.setUTCHours(0, 0, 0, 0);
    const document = await DB.findOne({ fecha: date });
    
    if (document) {
        const turno = document.turnos.find(turno => turno.turno === turnoProp);

        console.log(date,document);
        return turno ? false : true;
    } else {
        return true;
    }
}

module.exports = checkAvailability;