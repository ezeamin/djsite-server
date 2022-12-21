const nodemailer = require('nodemailer');

const sendPingMail = () => {
  const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_KEY,
    },
    tls: {
      rejectUnauthorized: false,
      ciphers: 'SSLv3',
    },
  });

  const text = `Hola Eze, tenes un fan! Alguien accedió a tu pagina`;

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: process.env.MAIL_USER,
    subject: 'Nuevo acceso a djezeamin.com',
    text: text,
  };

  transporter.sendMail(mailOptions);
};

module.exports = sendPingMail;
