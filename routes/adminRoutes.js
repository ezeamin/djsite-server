const express = require("express");
const router = express.Router();

const DbFechas = require("../models/fechas");
const validateEntries = require("../utils/validateEntries");

const expectedKeys = [
    "name",
    "fecha",
    "turno",
    "ubicacion",
    "tiempo",
    "servicio",
    "humo",
    "extra",
    "clientName",
    "clientPhone",
    "price",
    "paid",
  ];

router.put("/event", async (req, res) => {
  const fecha = req.body.fecha;
  const event = {
    turno: req.body.turno,
    name: req.body.name,
    start: req.body.start,
    end: req.body.end,
    ubicacion: req.body.ubicacion,
    servicio: req.body.servicio,
    humo: req.body.humo,
    price: req.body.price,
    paid: req.body.paid,
    extra: req.body.extra,
    client: {
      name: req.body.clientName,
      phone: req.body.clientPhone,
    },
  }

  if (!validateEntries(req.body, expectedKeys)) {
    return res.status(400).json({
      message: "Seleccioná todos los datos",
    });
  }

  try {
    const document = await DbFechas.findOne({ fecha });

    if (!document) {
      const newFecha = new DbFechas({
        fecha,
        turnos: [event],
      });

      await newFecha.save();

      return res.sendStatus(200);
    }

    const turnos = document.turnos;

    turnos.push(event);

    await DbFechas.updateOne({ fecha }, { turnos });

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
