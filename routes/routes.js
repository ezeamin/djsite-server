const express = require("express");
const router = express.Router();

const { google } = require("googleapis");
const parser = require("ua-parser-js");
const calculateDistance = require("../utils/calculateDistance");
const formatDate = require("../utils/formatDate");
const saveData = require("../utils/saveData");
const sendMail = require("../utils/sendMail");
const validateEntries = require("../utils/validateEntries");

/* Data */

let auth, client, googleSheets, spreadsheetId, horaExtra;

const getData = async () => {
  auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  client = await auth.getClient();

  // Instance of Google Sheets API
  googleSheets = google.sheets({ version: "v4", auth: client });

  spreadsheetId = "1B49Y0OxgnaJGVxbS1zyQ_KDbCnC8eGEuC82-5_rmErs";

  const data = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Hoja1!I2",
  });

  horaExtra = Number.parseInt(data.data.values[0]);
};

getData();

const expectedKeys = [
  "fecha",
  "turno",
  "locData",
  "tiempo",
  "servicio",
  "humo",
];

router.post("/", async (req, res) => {
  let col = "B",
    row = "3";
  let add = 0;
  const { fecha, turno, ubicacion, tiempo, servicio, humo } = req.body;

  // console.log(req.body);

  try {
    if (!validateEntries(req.body, expectedKeys)) {
      return res.status(400).json({
        message: "Seleccioná todos los datos",
      });
    }

    const distancia = await calculateDistance(ubicacion);

    if (distancia === 0) {
      return res.status(400).json({
        message:
          "Perdon! No se puede calcular la distancia al punto ingresado. Por favor reintentar mas tarde o contactar con Ezequiel.",
      });
    } else if (distancia >= 20) {
      return res.status(400).json({
        message:
          "Revisa la direccion. Es muy lejana (>20km). Si aún creés que es correcta, contactá con Ezequiel para un presupuesto especial.",
      });
    }

    switch (tiempo) {
      case "5": {
        add += horaExtra;
        break;
      }
      case "6": {
        col = "C";
        break;
      }
      case "Mas": {
        col = "C";
        add += horaExtra;
        break;
      }
      default: {
        break;
      }
    }

    if (Number.parseFloat(distancia) >= 5) {
      let ascii = col.charCodeAt(0);

      if (Number.parseFloat(distancia) >= 10) {
        // tercera columna
        ascii += 2;
        col = String.fromCharCode(ascii);
      } else {
        //segunda columna
        ascii += 4;
        col = String.fromCharCode(ascii);
      }
    }

    switch (servicio) {
      case "Basico": {
        row = "8";
        break;
      }
      case "Sonido": {
        row = "6";
        break;
      }
      case "Completo": {
        row = "4";
        break;
      }
      default: {
        break;
      }
    }

    if (humo) {
      row = Number.parseInt(row) - 1 + "";
    }

    const range = `Hoja1!${col}${row}`;
    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: range,
    });

    const value = Number.parseInt(getRows.data.values[0]) + add;
    const formattedDate = formatDate(fecha, "long");

    res.json({
      value,
      distancia,
      fecha: formattedDate,
    });

    if (!fecha) fecha = "N/A";
    if (!turno) turno = "N/A";

    const userAgent = req.headers["user-agent"];
    const userData = parser(userAgent);

    saveData(
      req.ip,
      fecha,
      turno,
      ubicacion,
      distancia,
      tiempo,
      servicio,
      humo,
      value,
      userData
    );

    sendMail(
      req.ip,
      formattedDate,
      turno,
      ubicacion,
      distancia,
      tiempo,
      servicio,
      humo,
      value,
      userData
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message:
        "Perdon! No se puede calcular la distancia al punto ingresado. Por favor reintentar o contactar con Ezequiel.",
    });
  }
});

router.get("/", (req, res) => {
  res.sendStatus(200); //ping
});

module.exports = router;
