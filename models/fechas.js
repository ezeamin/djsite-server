const mongoose = require("mongoose");
const { Schema } = mongoose;

const fechaSchema = new Schema({
  fecha: Date,
  turnos: [
    {
      turno: String,
      name: String,
      start: String,
      end: String,
      ubicacion: String,
      tiempo: String,
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

module.exports = mongoose.model("Fecha", fechaSchema);
