const mongoose = require("mongoose");
const { Schema } = mongoose;

const fechaSchema = new Schema({
  fecha: Date,
  turno: [
    {
      turno: String,
      name: String,
      start: String,
      end: String,
      ubicacion: String,
      servicio: String,
      humo: Boolean,
      value: Number,
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
