const fetch = require("node-fetch");

const request = require("request-promise-native");

const calculateDistance = async (ubicacion) => {
  const origin = "Av.%20Aconquija%20100,Yerba%20Buena,Tucuman";
  const destination = encodeURI(ubicacion);

  var options = {
    proxy: process.env.QUOTAGUARDSTATIC_URL,
    url: `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination}&origins=${origin}&key=${process.env.API_KEY}`,
    headers: {
      "User-Agent": "node.js",
    },
  };

  const body = request(options);

  // const res = await fetch(
  //   `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination}&origins=${origin}&key=${process.env.API_KEY}`
  // );

  const data = await body.json();
  // console.log(data);

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
