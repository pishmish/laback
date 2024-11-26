const request = require("supertest");
const app = require("../src/server"); // Path to your server file

describe("GET /", () => {
  it("should respond to the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });
});

// describe("POST /cart", () => {
//   it("should create a new cart and return the cart ID", async () => {
//     const response = await request(app).post("/cart").send({
//       fingerprint: "test-fingerprint",
//     });
//     expect(response.status).toBe(201);
//     expect(response.body.cartID).toBeDefined();
//   });

//   it("should fail when no fingerprint is provided", async () => {
//     const response = await request(app).post("/cart").send({});
//     expect(response.status).toBe(400); // Assuming 400 is returned for bad requests
//     expect(response.body.error).toBe("Fingerprint is required.");
//   });
// });


// describe("GET /store", () => {
//   it("should respond to the GET method", async () => {
//     const response = await request(app).get("/store");
//     expect(response.status).toBe(200);
//   });
// });

// describe("GET /store/product", () => {
//   it("should respond to the GET method", async () => {
//     const response = await request(app).get("/store/product");
//     expect(response.status).toBe(200);
//   });
// });
