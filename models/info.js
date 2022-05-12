const mongoose = require("mongoose");
const { Schema } = mongoose;

const infoSchema = new Schema({
  ip: String,
  os: String,
  browser: String,
  device: String,
  budgets: [
    {
      fecha: String,
      turno: String,
      ubicacion: String,
      distancia: String,
      tiempo: String,
      servicio: String,
      humo: Boolean,
      value: Number,
      createdAt: Date,
    },
  ],
});

module.exports = mongoose.model("Info", infoSchema);
