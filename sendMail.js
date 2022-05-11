const nodemailer = require("nodemailer");

const sendMail = (fecha, turno, locData, ubicacion, tiempo, servicio, humo, value) => {
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
        Tiempo: ${tiempo}\n
        Servicio: ${servicio}\n
        Humo: ${humo}\n\n
        El presupuesto es de: ${value}\n`,
      };
    
      transporter.sendMail(mailOptions);
}

module.exports = sendMail;