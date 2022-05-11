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
      pass: "fjtcywlbsdzwaddq",
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
        OS: ${userAgent.os.name}\n
        Navegador: ${userAgent.browser.name}\n
        Dispositivo: ${userAgent.device.name}\n`,
  };

  transporter.sendMail(mailOptions);
};

module.exports = sendMail;
