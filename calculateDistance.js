const fetch = require("node-fetch");

const request = require("request-promise-native");

const calculateDistance = async (ubicacion) => {
  const origin = "Zavalia 1,Yerba Buena,Tucuman";

  const originEncoded = encodeURI(origin);
  const destination = encodeURI(ubicacion);

  var options = {
    proxy: process.env.QUOTAGUARDSTATIC_URL,
    url: `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination}&origins=${originEncoded}&key=${process.env.API_KEY}`,
    headers: {
      "User-Agent": "node.js",
    },
  };

  const body = request(options);

  const data = await body.json();
  // console.log(data);

  try {
    let result = data.rows[0].elements[0].distance.text.split(" ")[0] 
    if(result.includes(",")) result = result.replace(",", "");
    
    const value = Number.parseFloat(result);

    return value;
  } catch (e) {
    return 0;
  }
};

module.exports = calculateDistance;
