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

describe(" GET /order", () => {
    it("should respond to the GET method", async () => {
        const response = await request.get("/order");
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.text).toEqual("Order API, welcome!");
    });
    
    it("should return a 404 status for an invalid route", async () => {
        const response = await request.get("/order/invalid-route");
        expect(response.status).toBe(404);
    });
});

describe("GET /order/getorder/:id", () => {
    it("should respond to the GET method", async () => {
        const id = 1;
        const response = await request.get(`/order/getorder/${id}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });
});

describe("GET /order/getorder/date", () => {
    it("should respond to the GET method", async () => {
        const response = await request.get(`/order/getorder/date`);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });
});

describe("GET /order/getallorders", () => {
    it("should respond to the GET method", async () => {
        const response = await request.get(`/order/getallorders`);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });
});

describe("GET /order/purchaseprice/:orderid/:productid", () => {
    it("should respond to the GET method", async () => {
        const orderid = 1;
        const productid = 1;
        const response = await request.get(`/order/purchaseprice/${orderid}/${productid}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });
});