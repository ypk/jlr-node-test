const readFileAsync = require('./read-file-async');

const MODEL_MAP = {
    "range": "Range Rover",
    "land": "Land Rover"
};

async function fetchData(req, res, next, model = null) {
    if (model === null) {
        model = req.params.model;
    }

    if (MODEL_MAP[model] !== undefined) {
        model = MODEL_MAP[model];
    }

    const data = await readFileAsync();
    let filteredData = [];
    for (const [key, value] of Object.entries(data)) {
        if (key.toLowerCase() === model.toLowerCase()) {
            filteredData.push(value.model)
        }
    }
    if (filteredData.length === 0) {
        res.status(404);
        return next();
    }
    res.status(200);
    res.send(filteredData);
}

module.exports = fetchData;