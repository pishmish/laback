const request = require("supertest");
const app = require("../src/server"); // Path to your server file

describe("GET /", () => {
  it("should respond to the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });
});
