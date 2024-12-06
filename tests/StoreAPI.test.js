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

describe("GET /store/search", () => {
  // it("should give an error (500) when no query is provided", async () => {
  //   const response = await request.get("/store/search");
  //   expect(response.status).toBe(500);
  //   expect(response.body).toBeDefined();
  // });

  //query string (filtered search)
  it("should respond to the GET method with a query string", async () => {
    const response = await request.get("/store/search?q=handbag&q=red");
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
});

describe("POST /store/sort", () => {
  const products = [
    {
      "productID": 1,
      "stock": 50,
      "name": "Sahar Voyage",
      "unitPrice": "68.39",
      "overallRating": "4.3",
      "discountPercentage": 10,
      "description": "A versatile tote for daily adventures.",
      "timeListed": "2024-11-21T11:49:27.000Z",
      "brand": "Terre Nomade",
      "color": "Khaki",
      "showProduct": 1,
      "supplierID": 1,
      "material": "Canvas",
      "capacityLitres": "15.5",
      "warrantyMonths": 12,
      "serialNumber": "SN-TB-S01",
      "popularity": 85
    },
    {
      "productID": 2,
      "stock": 40,
      "name": "Zad Pérégrin",
      "unitPrice": "69.99",
      "overallRating": "4.5",
      "discountPercentage": 5,
      "description": "Stylish and functional for urban explorers.",
      "timeListed": "2024-11-21T11:49:27.000Z",
      "brand": "Étoile du Voyage",
      "color": "Black",
      "showProduct": 1,
      "supplierID": 1,
      "material": "Leather",
      "capacityLitres": "13.0",
      "warrantyMonths": 12,
      "serialNumber": "SN-TB-S02",
      "popularity": 92
    },
    {
      "productID": 3,
      "stock": 30,
      "name": "Atlas Errant",
      "unitPrice": "89.99",
      "overallRating": "4.2",
      "discountPercentage": 8,
      "description": "A spacious tote inspired by journeys.",
      "timeListed": "2024-11-21T11:49:27.000Z",
      "brand": "Évasion",
      "color": "Navy",
      "showProduct": 1,
      "supplierID": 1,
      "material": "Recycled Polyester",
      "capacityLitres": "16.2",
      "warrantyMonths": 12,
      "serialNumber": "SN-TB-S03",
      "popularity": 77
    }
  ];

  it("should respond to the POST method with sorting", async () => {
    const response = await request.post("/store/sort")
      .send( products )
      .query({ sortBy: "unitPrice", sortOrder: "asc" });
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          productID: 1,
        }),
      ])
    );
  });

  it("should respond to the POST method with sorting in descending order", async () => {
    const response = await request
      .post("/store/sort")
      .send( products )
      .query({ sortBy: "unitPrice", sortOrder: "desc" });

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          productID: 3,
        }),
      ])
    );
  });

  //wrong/missing sortOrder string (default)
  it("should respond to the POST method with a wrong query string", async () => {
    const response = await request
      .post("/store/sort")
      .send( products )
      .query({ sortBy: "unitPrice", sortOrder: "invalid" });

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  //wrong sortBy string (default)
  it("should respond to the POST method with a wrong query string", async () => {
    const response = await request
      .post("/store/sort")
      .send( products )
      .query({ sortBy: "invalid", sortOrder: "asc" });

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

});