const app = require("../index");
const supertest = require("supertest");
const fs = require("fs");
const readFileAsync = require('../src/utils/read-file-async');
const mockFleet = { "jaguar": 200, "rover": 900, "hybrid": 500 };

let instance = {
    ip: '0.0.0.0',
    port: 5001
};

app.listen(instance.port, instance.ip, function () {
    console.log("Test Server has been started!");
});

describe('Test Fleet', () => {
    test("GET /api/v1/fleet/", async () => {
        await supertest(app).get("/api/v1/fleet/")
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(expect.objectContaining(mockFleet));
            });
    });
});

describe('Testing /api end point', () => {
    const api = "/api/v1/fleet/all";
    const allModelsApi = `/api/v1/fleet/models`;
    const jaguarApi = `${allModelsApi}/jaguar`;
    const badModelApi = `${allModelsApi}/ford escort`;
    const allModelsApiLength = 14;
    const jaguarModelApiLength = 6;

    /* expect to have correct object as response */
    test(`GET all data from '${api}'`, async () => {
        const data = await readFileAsync();
        await supertest(app).get(api)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(expect.objectContaining(data));
            });
    });

    /* expect equal number of response objects for all models */
    test(`Confirm '${api}' length to be equal to be 3`, async () => {
        const data = await readFileAsync();
        await supertest(app).get(api)
            .expect(200)
            .then((response) => {
                expect(Object.keys(response.body).length).toEqual(Object.keys(data).length);
            });
    });

    /* expect to have correct object as response */
    test(`GET all models from '${allModelsApi}'`, async () => {
        const data = await readFileAsync();
        const allModels = [];
        await supertest(app).get(allModelsApi)
            .expect(200)
            .then((response) => {
                for (const [key, value] of Object.entries(data)) {
                    for (const [k, v] of Object.entries(value.model)) {
                        allModels.push(`${key} - ${k}${v ? ` - ${v}` : ""}`)
                    }
                }
                expect(response.body).toEqual(expect.objectContaining(allModels));
            });
    });

    /* expect equal number of response objects for all models */
    test(`Confirm '${allModelsApi}' length to be equal to ${allModelsApiLength} `, async () => {
        await supertest(app).get(allModelsApi)
            .expect(200)
            .then((response) => {
                expect(response.body.length).toEqual(allModelsApiLength);
            });
    });

    /* expect to have correct object as response */
    test(`GET jaguar models from '${jaguarApi}'`, async () => {
        const modelData = [];
        await supertest(app).get(jaguarApi)
            .expect(200)
            .then((response) => {
                for (const [key, value] of Object.entries(response.body)) {
                    if (key.toLowerCase() === 'jaguar') {
                        modelData.push(value.model)
                    }
                }
                expect(response.body).toEqual(expect.objectContaining(modelData));
            });
    });

    /* expect equal number of response objects for a specific model */
    test(`Confirm '${jaguarApi}' length to be equal to '${jaguarModelApiLength}'`, async () => {
        await supertest(app).get(jaguarApi)
            .expect(200)
            .then((response) => {
                const models = Object.keys(response.body[0]);
                expect(models.length).toEqual(jaguarModelApiLength);
            });
    });

    /* expect a 404 when bad request is made */
    test(`GET 'ford escort' from '${badModelApi}'`, async (done) => {
        await supertest(app).get(badModelApi)
            .expect(404);
            done();
    });
});