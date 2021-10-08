const app = require("../index");
const supertest = require("supertest");
const dbFleet = require("../src/db/fleet.json");
const mockFleet = { "jaguar": 200, "rover": 900, "hybrid":500};

let instance = {
    ip: '0.0.0.0',
    port: 5001
};

app.listen(instance.port, instance.ip, function() {
    console.log("Test Server has been started!");
});

describe('Test Fleet', () => {

    test("GET /api/v1/fleet/all", async () => {
        await supertest(app).get("/api/v1/fleet/all")
            .expect(200)
            .then((response) => {
                expect(response).toEqual(mockFleet);
            });
    });

});