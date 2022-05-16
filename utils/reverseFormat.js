const reverseFormat = (fecha, mode) => {
  let fechaArray, fechaNew;

  if (mode === "ISO") {
    fechaNew = fecha.toISOString().split("T")[0];
  } else {
    fechaArray = fecha.split("/");
    fechaNew = `${fechaArray[2]}-${fechaArray[1]}-${fechaArray[0]}`;
  }

  return fechaNew;
};

module.exports = reverseFormat;
