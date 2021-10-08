const fs = require("fs");
const path = require('path');

const readFileAsync = async () => {
    const fsPromises = fs.promises;
    const data = await fsPromises.readFile(path.resolve(__dirname, '../db/fleet.json')).catch((err) => console.error('Failed to read file', err));
    return JSON.parse(data.toString());
};

module.exports = readFileAsync;