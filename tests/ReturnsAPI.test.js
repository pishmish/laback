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


describe("GET /returns", () => {
    it("should respond to the GET method", async () => {
        const response = await request.get("/returns");
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.text).toEqual("Returns API is working");
    });
    
    it("should return a 404 status for an invalid route", async () => {
        const response = await request.get("/returns/invalid-route");
        expect(response.status).toBe(404);
    });
});

describe("GET /returns/all", () => {
    it("should respond to the GET method", async () => {
        const response = await request.get("/returns/all");
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });
});

describe("GET /returns/request/:id", () => {
    it("should respond to the GET method", async () => {
        const requestid = 1;
        const response = await request.get(`/returns/request/${requestid}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });
});

describe("GET /returns/request/:id/status", () => {
    it("should respond to the GET method", async () => {
        const requestid = 1;
        const response = await request.get(`/returns/request/${requestid}/status`);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });
});

describe("GET /returns/request/:id/cost", () => {
    it("should respond to the GET method", async () => {
        const requestid = 1;
        const response = await request.get(`/returns/request/${requestid}/cost`);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });
});

describe("GET /returns/request/customer/:username", () => {
    it("should respond to the GET method", async () => {
        const username = "evadavis";
        const response = await request.get(`/returns/request/customer/${username}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });
});