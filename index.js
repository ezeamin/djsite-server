require("dotenv").config();

const express = require("express");
const { google } = require("googleapis");
const morgan = require("morgan");
const calculateDistance = require("./calculateDistance");
const cors = require("cors");
const validateEntries = require("./validateEntries");
const sendMail = require("./sendMail");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://djezeamin.netlify.app", "https://djezeamin.com", "http://djezeamin.com"],
  })
);

app.set("port", process.env.PORT || 5000);

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
//

app.post("/", async (req, res) => {
  let col = "B",
    row = "3";
  let add = 0;
  const { fecha, turno, locData, tiempo, servicio, humo } = req.body;

  if (!validateEntries(req.body)) {
    return res.status(400).json({
      message: "Seleccioná todos los datos",
    });
  }

  const ubicacion = await calculateDistance(locData);

  if (ubicacion === 0) {
    return res.status(400).json({
      message: "No se puede calcular la distancia al punto ingresado",
    });
  }

  switch (Number.parseInt(tiempo)) {
    case 5: {
      add += horaExtra;
      break;
    }
    case 6: {
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

  if (Number.parseFloat(ubicacion) >= 5) {
    let ascii = col.charCodeAt(0);

    if (Number.parseFloat(ubicacion) >= 10) {
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

  res.json(value);

  if(!fecha) fecha = "N/A";
  if(!turno) turno = "N/A";
  
  sendMail(fecha, turno, locData, ubicacion, tiempo, servicio, humo, value);
});

app.listen(app.get("port"), (req, res) =>
  console.log("Server running on port " + app.get("port"))
);
