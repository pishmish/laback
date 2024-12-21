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

describe("GET /address", () => {
  it("should respond to the GET method", async () => {
    const response = await request.get("/address");
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.text).toEqual("Address API, welcome!");
  });

  it("should return a 404 status for an invalid route", async () => {
    const response = await request.get("/address/invalid-route");
    expect(response.status).toBe(404);
  });
});

describe("GET /address/id/:addressid", () => {
  it("should respond to the GET method", async () => {
    const addressID = 1;
    const response = await request.get(`/address/id/${addressID}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
});

describe("GET /address/uname/:username", () => {
  it("should respond to the GET method", async () => {
    const username = "evadavis";
    const response = await request.get(`/address/uname/${username}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it("should return a 500 status for an unauthorized user", async () => {
    const username = "hmmm";
    const response = await request.get(`/address/uname/${username}`);
    expect(response.status).toBe(500);
  });
});