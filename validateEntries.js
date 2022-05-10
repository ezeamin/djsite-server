const validateEntries = (body) => {
    const expectedKeys = [
        "locData",
        "tiempo",
        "servicio",
        "humo"
    ];

    const keys = Object.keys(body);

    if(body.locData.length === 0) return false;
    return keys.length === expectedKeys.length;
}

module.exports = validateEntries;