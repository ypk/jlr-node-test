const express = require("express");
const readFileAsync = require('../utils/read-file-async');
const fetchData = require("../utils/fetch-data");
const router = express.Router();

// defining an endpoint to return all ads
const fleet = { "jaguar": 200, "rover": 900, "hybrid": 500 };

router.get("/", function (req, res, next) {
    res.status(200);
    res.send(fleet);
});

router.get("/all", async function (req, res, next) {
    const data = await readFileAsync();
    res.status(200);
    res.send(data);
});

router.get("/models", async function (req, res, next) {
    const data = await readFileAsync();
    const allModels = [];
    for (const [key, value] of Object.entries(data)) {
        for (const [k, v] of Object.entries(value.model)) {
            allModels.push(`${key} - ${k}${v ? ` - ${v}` : ""}`)
        }
    }
    res.status(200);
    res.send(allModels);
});

router.get("/models/:model", async function (req, res, next) {
    await fetchData(req, res, next);
});


module.exports = router;

