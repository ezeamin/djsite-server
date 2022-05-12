const DB = require("../models/info");

const saveData = async (
  ip,
  fecha,
  turno,
  ubicacion,
  distancia,
  tiempo,
  servicio,
  humo,
  value,
  userData
) => {
  const budget = {
    fecha,
    turno,
    ubicacion,
    distancia,
    tiempo,
    servicio,
    humo,
    value,
    createdAt: new Date(),
  };

  const document = await DB.findOne({ ip });

  if (document) {
    const budgets = document.budgets;

    budgets.push(budget);
    await DB.findOneAndUpdate({ ip }, { budgets });
  } else {
    const newDocument = new DB({
      ip,
      os: `${userData.os.name} ${userData.os.version}`,
      browser: `${userData.browser.name} ${userData.browser.version}`,
      device: `${userAgent.device.vendor} ${userAgent.device.model} (${userAgent.device.type})`,
      budgets: [budget],
    });

    await newDocument.save();
  }
};

module.exports = saveData;
