describe('express form testing', ()=>{
    const axios = require('axios');
    const readline = require('readline');
    const fixture = require('./fixture')
    let server;

    beforeEach(()=>{
        server = require('../src/app');
    });

    afterEach(()=>{
        server.close();
    });

    it('should return an html form', async (done)=>{
        try {
            const html = await axios.get("http://127.0.0.1:9000/new_visitor");
            var hasData = readline(html.data);
        
            expect(hasData).toEqual(fixture);
        } catch (err) {
            console.log(err)
        }
        done();
    });
});


describe("Server testing", () => {
    let server;
    var Request = require("request");
    beforeAll(() => {
        server = require('../src/app')
    });
    afterAll(() => {
        server.close();
    });
    describe("get/", () => {
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:9000/new_visit", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });
        it("status should be 200", () => {
            expect(data.status).toBe(200);
        });
    });
});