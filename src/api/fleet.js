const express = require("express");
const router = express.Router();
const dbFleet = require("../db/fleet.json");

router.get("/all", function (req, res, next) {
    res.status(200);
    res.send(dbFleet);
});

router.get("/:model", function (req, res, next) {
    const { model } = req.params;
    let filteredModel = [];
    Object.keys(dbFleet).forEach(fleetItem => {
        const models = dbFleet[fleetItem].model;
        if(models.hasOwnProperty(model)){
            filteredModel.push({
                [fleetItem]: {
                    [model]: dbFleet[fleetItem].model[model]
                }
            })
        }
        return filteredModel;
    });
    res.status(200);
    res.send(filteredModel);
});


module.exports = router;