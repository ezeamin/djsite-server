const nodemailer = require("nodemailer");

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
      user: "ezequielamin@outlook.com",
      pass: process.env.MAIL_KEY,
    },
    tls: {
      rejectUnauthorized: false,
      ciphers: "SSLv3",
    },
  });

  const mailOptions = {
    from: "ezequielamin@outlook.com",
    to: "ezequielamin@outlook.com",
    subject: "Nueva solicitud de presupuesto",
    text: `Hola Eze, solicitaron un nuevo presupuesto:\n
        Fecha: ${fecha}\n
        Turno: ${turno}\n
        Ubicación: ${locData} (${ubicacion} km)\n
        Tiempo: ${tiempo} horas\n
        Servicio: ${servicio}\n
        Humo: ${humo ? "Si" : "No"}\n\n
        El presupuesto es de: $${value}\n\n
        OS: ${userAgent.os.name} ${userAgent.os.version}\n
        Navegador: ${userAgent.browser.name}\n
        Dispositivo: ${userAgent.device.vendor} ${userAgent.device.model} (${userAgent.device.type})\n`,
  };

  transporter.sendMail(mailOptions);
};

module.exports = sendMail;
