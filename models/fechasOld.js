const mongoose = require("mongoose");
const { Schema } = mongoose;

const fechasOldSchema = new Schema({
  fecha: Date,
  año: Number,
  mes: Number,
  turnos: [
    {
      turno: String,
      name: String,
      start: String,
      end: String,
      ubicacion: String,
      servicio: String,
      humo: Boolean,
      price: Number,
      paid: Number,
      extra: String,
      client: {
        name: String,
        phone: String,
      },
    },
  ],
});

module.exports = mongoose.model("Fecha_Old", fechasOldSchema);
