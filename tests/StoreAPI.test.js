const supertest = require('supertest');
const app = require('../src/server'); // Adjust the path as needed
const db = require('../src/config/database'); // Adjust the path as needed
// const e = require('express');
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

describe("GET /store", () => {
  it("should respond to the GET method", async () => {
    const response = await request.get("/store");
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it("should return a 404 status for an invalid route", async () => {
    const response = await request.get("/store/invalid-route");
    expect(response.status).toBe(404);
  });
});

describe("GET /store/product", () => {
  it("should respond to the GET method", async () => {
    const response = await request.get("/store/product");
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  // it("should return a 404 status for an invalid route", async () => {
  //   const response = await request.get("/store/product/invalid-route");
  //   expect(response.status).toBe(404);
  // });
});

describe("GET /store/product/:id", () => {
  it("should return a specific product if an ID is provided", async () => {
    const productID = 1; // Adjust this ID to match your database
    const response = await request.get(`/store/product/${productID}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
              productID: productID,
            }),
        ])
    );
  });

  it("should return a blank array for a non-existent product", async () => {
    const productID = 9999; // Adjust this ID to a non-existent product
    const response = await request.get(`/store/product/${productID}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});

describe("GET /store/category", () => {
  it("should respond to the GET method", async () => {
    const response = await request.get("/store/category");
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  // it("should return a 404 status for an invalid route", async () => {
  //   const response = await request.get("/store/category/invalid-route");
  //   expect(response.status).toBe(404);
  // });
});

describe("GET /store/category/:name", () => {
  it("should respond to the GET method with a specific category", async () => {
    const name = "Handbags"; // Replace with a valid category ID
    const response = await request.get(`/store/category/${name}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
            name: name,
        }),
      ])
    );
  });

  it("should return blank array for a non-existent category", async () => {
    const name = "9999"; // Replace with a non-existent category ID
    const response = await request.get(`/store/category/${name}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});

describe("GET /store/category/:name/products", () => {
  it("should respond to the GET method with products for a specific category", async () => {
    const name = "Handbags"; // Replace with a valid category ID
    const response = await request.get(`/store/category/${name}/products`);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it("should return 404 for a non-existent category", async () => {
    const name = "9999"; // Replace with a non-existent category ID
    const response = await request.get(`/store/category/${name}/products`);
    expect(response.status).toBe(404);
  });
});

describe("GET /store/product/:id/reviews", () => {
  it("should respond to the GET method with reviews for a specific product", async () => {
    const productID = 1; // Replace with a valid product ID
    const response = await request.get(`/store/product/${productID}/reviews`);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it("should return a blank array for a non-existent product", async () => {
    const productID = 9999; // Replace with a non-existent product ID
    const response = await request.get(`/store/product/${productID}/reviews`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});

describe("GET /store/product/:id/reviews/:reviewId", () => {
  it("should respond to the GET method with a specific review for a product", async () => {
    const productID = 1; // Replace with a valid product ID
    const reviewID = 1; // Replace with a valid review ID
    const response = await request.get(`/store/product/${productID}/reviews/${reviewID}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it("should return a blank array for a non-existent review", async () => {
    const productID = 1; // Replace with a valid product ID
    const reviewID = 9999; // Replace with a non-existent review ID
    const response = await request.get(`/store/product/${productID}/reviews/${reviewID}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  // it("should return a blank array for a non-existent product", async () => {
  //   const productID = 9999; // Replace with a non-existent product ID
  //   const reviewID = 1; // Replace with a valid review ID
  //   const response = await request.get(`/store/product/${productID}/reviews/${reviewID}`);
  //   expect(response.status).toBe(200);
  //   expect(response.body).toEqual([]);
  // });
});

describe("GET /store/searchSort", () => {
  it("should respond to the GET method", async () => {
    const response = await request.get("/store/searchSort");
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  //query string (filtered search)
  it("should respond to the GET method with a query string", async () => {
    const response = await request.get("/store/searchSort?q=handbag&q=red");
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  //sortBy and sortOrder (sorted search)
  it("should respond to the GET method with a sortBy and sortOrder", async () => {
    const response = await request.get("/store/searchSort?sortBy=unitPrice&sortOrder=asc");
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  //query string and sortBy and sortOrder (filtered and sorted search) - 1st way
  it("should respond to the GET method with a query string, sortBy, and sortOrder", async () => {
    const response = await request.get("/store/searchSort?q=handbag&q=red&sortBy=unitPrice&sortOrder=asc");
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  //query string and sortBy and sortOrder (filtered and sorted search) - 2nd way
  it("should respond to the GET method with a query string, sortBy, and sortOrder", async () => {
    const response = await request.get("/store/searchSort?sortBy=unitPrice&sortOrder=asc&q=handbag&q=red");
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
});
