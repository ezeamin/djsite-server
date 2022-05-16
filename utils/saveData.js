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
      os: `${userData && userData.os.name} ${userData && userData.os.version}`,
      browser: `${userData && userData.browser.name} ${userData && userData.browser.version}`,
      device: `${userData && userData.device.vendor} ${userData && userData.device.model} (${userData && userData.device.type})`,
      budgets: [budget],
    });

    await newDocument.save();
  }
};

module.exports = saveData;
