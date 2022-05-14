const validateEntries = (body, expectedKeys) => {
    const keys = Object.keys(body);

    if(body.ubicacion.length === 0) return false;
    return keys.length === expectedKeys.length;
}

module.exports = validateEntries;