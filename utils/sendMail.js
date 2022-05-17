const nodemailer = require("nodemailer");
const formatDate = require("./formatDate");

const sendMail = (
  fecha,
  turno,
  locData,
  ubicacion,
  tiempo,
  servicio,
  humo,
  value,
  userAgent
) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_KEY,
    },
    tls: {
      rejectUnauthorized: false,
      ciphers: "SSLv3",
    },
  });

  let text;

  if (userAgent && userAgent.browser && userAgent.device && userAgent.os) {
    text = `Hola Eze, solicitaron un nuevo presupuesto:\n
  Fecha: ${fecha}\n
  Turno: ${turno}\n
  Ubicación: ${locData} (${ubicacion} km)\n
  (https://www.google.com/maps/search/?api=1&query=${encodeURI(locData)})\n
  Tiempo: ${tiempo} horas\n
  Servicio: ${servicio}\n
  Humo: ${humo ? "Si" : "No"}\n\n
  El presupuesto es de: $${value}\n\n
  OS: ${userAgent.os.name} ${userAgent.os.version}\n
  Navegador: ${userAgent.browser.name} ${userAgent.browser.version}\n
  Dispositivo: ${userAgent.device.vendor} ${userAgent.device.model} (${
      userAgent.device.type
    })\n`;
  } else {
    text = `Hola Eze, solicitaron un nuevo presupuesto:\n
  Fecha: ${fecha}\n
  Turno: ${turno}\n
  Ubicación: ${locData} (${ubicacion} km)\n
  (https://www.google.com/maps/search/?api=1&query=${encodeURI(locData)})\n
  Tiempo: ${tiempo} horas\n
  Servicio: ${servicio}\n
  Humo: ${humo ? "Si" : "No"}\n\n
  El presupuesto es de: $${value}\n\n
  OS: N/A\n
  Navegador: N/A\n
  Dispositivo: N/A\n`;
  }

  const mailOptions = {
    from: "ezequielamin@outlook.com",
    to: "ezequielamin@outlook.com",
    subject: "Nueva solicitud de presupuesto",
    text: text,
  };

  transporter.sendMail(mailOptions);
};

module.exports = sendMail;
