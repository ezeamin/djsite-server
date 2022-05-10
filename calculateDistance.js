const fetch = require("node-fetch");

const calculateDistance = async (ubicacion) => {
//   const latCasa = -26.818016;
//   const longCasa = -65.267137;

  const origin = "Av.%20Aconquija%20100,Yerba%20Buena,Tucuman"
  const destination = encodeURI(ubicacion);
  
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination}&origins=${origin}&key=${process.env.API_KEY}`
  );
  const data = await res.json();

  console.log(data);

  try {
    const value = Number.parseFloat(
      data.rows[0].elements[0].distance.text.split(" ")[0]
    );
    return value;
  } catch (e) {
    return 0;
  }
};

module.exports = calculateDistance;
