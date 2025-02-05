const supertest = require('supertest');
const app = require('../src/server'); // Adjust the path as needed
const db = require('../src/config/database'); // Adjust the path as needed
let server;
let request;

beforeAll((done) => {
  server = app.listen(done); // Start the app
  request = supertest(server); // Attach Supertest to the server
});

afterAll((done) => {
  server.close(done); // Close the server after all tests
  db.end(done); // Close the database connection
});

describe("GET /cart", () => {
    it("should respond to the GET method", async () => {
        const response = await request.get("/cart");
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.text).toEqual("Cart API, welcome!");
    });
    
    it("should return a 404 status for an invalid route", async () => {
        const response = await request.get("/cart/invalid-route");
        expect(response.status).toBe(404);
    });
});