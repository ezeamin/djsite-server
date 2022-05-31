const express = require("express");
const router = express.Router();

const DbFechas = require("../models/fechas");
const DbFechasOld = require("../models/fechasOld");
const formatDate = require("../utils/formatDate");
const reverseFormat = require("../utils/reverseFormat");
const validateEntries = require("../utils/validateEntries");

const expectedKeys = [
  "name",
  "fecha",
  "turno",
  "start",
  "end",
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
    name: req.body.name,
    turno: req.body.turno,
    start: req.body.start,
    end: req.body.end,
    ubicacion: req.body.ubicacion,
    tiempo: req.body.tiempo,
    servicio: req.body.servicio,
    humo: req.body.humo,
    price: req.body.price,
    paid: req.body.paid,
    extra: req.body.extra,
    isFechaOcupada: false,
    client: {
      name: req.body.clientName,
      phone: req.body.clientPhone,
    },
  };

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

router.get("/events", async (req, res) => {
  try {
    const document = await DbFechas.find();

    if (!document) {
      return res.sendStatus(204);
    }

    //const turnos = document.turnos;

    const data = document.sort((a, b) => {
      return new Date(a.fecha) - new Date(b.fecha);
    });

    const dataTurno = data.map((fecha) => {
      const evento = fecha.toJSON();

      evento.turnos.sort((a, b) => {
        const startA =
          Number.parseInt(a.start.split(":")[0]) +
          Number.parseInt(a.start.split(":")[1] / 60);
        const startB =
          Number.parseInt(b.start.split(":")[0]) +
          Number.parseInt(b.start.split(":")[1] / 60);

        return startA - startB;
      });

      return evento;
    });

    const eventos = dataTurno.map((docEvent) => {
      const evento = docEvent;
      delete evento.__v;

      evento.formattedFecha = formatDate(evento.fecha, "short");
      evento.fecha = formatDate(evento.fecha, "/");

      return evento;
    });

    return res.status(200).json(eventos);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.put("/events/old", async (req, res) => {
  const idFecha = req.body.idFecha;
  const idEvento = req.body.idEvento;
  const fechaEvento = req.body.fechaEvento;

  try {
    const document = await DbFechas.findById(idFecha);

    if (!document) {
      return res.sendStatus(204);
    }

    const turnos = document.turnos;

    const evento = turnos.find((turno) => turno._id == idEvento);

    if (!evento) {
      return res.sendStatus(204);
    }

    const newEvento = {
      ...evento,
    };

    delete newEvento._id;

    const revDate = reverseFormat(fechaEvento, "");
    const newDocument = await DbFechasOld.findOne({ fecha: revDate });

    if (!newDocument) {
      const newFecha = new DbFechasOld({
        fecha: revDate,
        año: revDate.split("-")[0],
        mes: new Date(revDate).getMonth() + 1,
        turnos: [newEvento],
      });

      await newFecha.save();
    } else {
      const turnosOld = newDocument.turnos;

      turnosOld.push(newEvento);

      await DbFechasOld.updateOne({ fecha: revDate }, { turnos: turnosOld });
    }

    // delete from fechas

    const index = turnos.findIndex((turno) => turno._id == idEvento);

    turnos.splice(index, 1);

    console.log(turnos);

    if (turnos.length !== 0)
      await DbFechas.updateOne({ _id: idFecha }, { turnos });
    else await DbFechas.deleteOne({ _id: idFecha });

    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/event/:fechaId/:eventoId", async (req, res) => {
  try {
    const document = await DbFechas.findOne({ _id: req.params.fechaId });

    const evento = document.turnos
      .find((turno) => turno._id == req.params.eventoId)
      .toJSON();

    evento.fecha = reverseFormat(document.fecha, "ISO");

    return res.status(200).json(evento);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.put("/event/edit/:fechaId/:eventoId", async (req, res) => {
  try {
    const fecha = req.body.fecha;
    const event = {
      name: req.body.name,
      turno: req.body.turno,
      start: req.body.start,
      end: req.body.end,
      ubicacion: req.body.ubicacion,
      tiempo: req.body.tiempo,
      servicio: req.body.servicio,
      humo: req.body.humo,
      price: req.body.price,
      paid: req.body.paid,
      extra: req.body.extra,
      isFechaOcupada: false,
      client: {
        name: req.body.clientName,
        phone: req.body.clientPhone,
      },
    };

    const document = await DbFechas.findOne({ _id: req.params.fechaId });

    const prevFecha = reverseFormat(document.fecha, "ISO");

    // same date
    if (prevFecha === fecha) {
      const turnos = document.turnos;

      const index = turnos.findIndex(
        (turno) => turno._id == req.params.eventoId
      );

      turnos[index] = event;

      await DbFechas.updateOne({ _id: req.params.fechaId }, { turnos });

      return res.sendStatus(200);
    }

    // date changed
    const newDocument = await DbFechas.findOne({ fecha: fecha });

    if (!newDocument) {
      const newFecha = new DbFechas({
        fecha: fecha,
        turnos: [event],
      });

      await newFecha.save();
    } else {
      const turnos = newDocument.turnos;

      turnos.push(event);

      await DbFechas.updateOne({ fecha: fecha }, { turnos });
    }

    // delete from fechas

    const index = document.turnos.findIndex(
      (turno) => turno._id == req.params.eventoId
    );

    document.turnos.splice(index, 1);

    if (document.turnos.length === 0) {
      await DbFechas.deleteOne({ _id: req.params.fechaId });
    } else
      await DbFechas.updateOne(
        { _id: req.params.fechaId },
        { turnos: document.turnos }
      );

    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.delete("/event/:fechaId/:eventoId", async (req, res) => {
  try {
    const document = await DbFechas.findOne({ _id: req.params.fechaId });

    const turnos = document.turnos;

    const index = turnos.findIndex((turno) => turno._id == req.params.eventoId);

    turnos.splice(index, 1);

    if (turnos.length === 0) {
      await DbFechas.deleteOne({ _id: req.params.fechaId });
    } else
      await DbFechas.updateOne(
        { _id: req.params.fechaId },
        { turnos: document.turnos }
      );

    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// fechas ocupadas

router.put("/fechaocupada", async (req, res) => {
  const fecha = req.body.fecha;
  const event = {
    name: req.body.name,
    turno: req.body.turno,
    start: "",
    end: "",
    ubicacion: "",
    tiempo: "",
    servicio: "",
    humo: false,
    price: "",
    paid: "",
    extra: "",
    isFechaOcupada: true,
    client: {
      name: "",
      phone: "",
    },
  };

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


router.put("/fechaocupada/edit/:fechaId/:eventoId", async (req, res) => {
  try {
    const fecha = req.body.fecha;
    const event = {
      name: req.body.name,
      turno: req.body.turno,
      start: "",
      end: "",
      ubicacion: "",
      tiempo: "",
      servicio: "",
      humo: false,
      price: "",
      paid: "",
      extra: "",
      isFechaOcupada: true,
      client: {
        name: "",
        phone: "",
      },
    };

    const document = await DbFechas.findOne({ _id: req.params.fechaId });

    const prevFecha = reverseFormat(document.fecha, "ISO");

    // same date
    if (prevFecha === fecha) {
      const turnos = document.turnos;

      const index = turnos.findIndex(
        (turno) => turno._id == req.params.eventoId
      );

      turnos[index] = event;

      await DbFechas.updateOne({ _id: req.params.fechaId }, { turnos });

      return res.sendStatus(200);
    }

    // date changed
    const newDocument = await DbFechas.findOne({ fecha: fecha });

    if (!newDocument) {
      const newFecha = new DbFechas({
        fecha: fecha,
        turnos: [event],
      });

      await newFecha.save();
    } else {
      const turnos = newDocument.turnos;

      turnos.push(event);

      await DbFechas.updateOne({ fecha: fecha }, { turnos });
    }

    // delete from fechas

    const index = document.turnos.findIndex(
      (turno) => turno._id == req.params.eventoId
    );

    document.turnos.splice(index, 1);

    if (document.turnos.length === 0) {
      await DbFechas.deleteOne({ _id: req.params.fechaId });
    } else
      await DbFechas.updateOne(
        { _id: req.params.fechaId },
        { turnos: document.turnos }
      );

    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
