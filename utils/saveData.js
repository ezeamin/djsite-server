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
  value
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
      budgets: [budget],
    });

    await newDocument.save();
  }
};

module.exports = saveData;
