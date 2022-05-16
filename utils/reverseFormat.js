const reverseFormat = (fecha) => {
    const fechaArray = fecha.split("/");
    const fechaNew = `${fechaArray[2]}-${fechaArray[1]}-${fechaArray[0]}`;
    return fechaNew;
}

module.exports = reverseFormat;