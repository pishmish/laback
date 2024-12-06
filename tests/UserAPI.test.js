const supertest = require('supertest');
const app = require('../src/server'); // Adjust the path as needed
let server;
let request;

beforeAll((done) => {
  server = app.listen(done); // Start the app
  request = supertest(server); // Attach Supertest to the server
});

afterAll((done) => {
  server.close(done); // Close the server after all tests
});

describe("GET /user", () => {
    it("should respond to the GET method", async () => {
        const response = await request.get("/user");
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.text).toEqual("User API, welcome!");
    });
    
    it("should return a 404 status for an invalid route", async () => {
        const response = await request.get("/user/invalid-route");
        expect(response.status).toBe(404);
    });
});
