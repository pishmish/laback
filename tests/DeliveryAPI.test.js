const supertest = require('supertest');
const app = require('../src/server'); // Adjust the path as needed
const db = require('../src/config/database'); // Adjust the path as needed
let server;
let request;

// Mock the authenticateToken and authenticateRole middleware
jest.mock('../src/middleware/auth-handler', () => ({
  authenticateToken: (req, res, next) => {
    next();
  },
  authenticateRole: () => (req, res, next) => {
    next();
  },
}));

beforeAll((done) => {
  server = app.listen(done); // Start the app
  request = supertest(server); // Attach Supertest to the server
});

afterAll((done) => {
  server.close(done); // Close the server after all tests
  db.end(done); // Close the database connection
});

describe("GET /delivery", () => {
    it("should respond to the GET method", async () => {
        const response = await request.get("/delivery");
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.text).toEqual("Delivery API, welcome!");
    });
    
    it("should return a 404 status for an invalid route", async () => {
        const response = await request.get("/delivery/invalid-route");
        expect(response.status).toBe(404);
    });
    });

describe("GET /delivery/estimate/:id", () => {
    it("should respond to the GET method", async () => {
        const id = 1;
        const response = await request.get(`/delivery/estimate/${id}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });
});

describe("GET /delivery/order/courier/:courierid", () => {
    it("should respond to the GET method", async () => {
        const courierid = 1;
        const response = await request.get(`/delivery/order/courier/${courierid}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });
});

describe("GET /delivery/order/:id", () => {
    it("should respond to the GET method", async () => {
        const id = 1;
        const response = await request.get(`/delivery/order/${id}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });
});

describe("GET /delivery/order/:id/status", () => {
    it("should respond to the GET method", async () => {
        const id = 1;
        const response = await request.get(`/delivery/order/${id}/status`);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });
});