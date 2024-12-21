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

describe("GET /analytics", () => {
    it("should respond to the GET method", async () => {
        const response = await request.get("/analytics");
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.text).toEqual("Analytics API, welcome!");
    });
    
    it("should return a 404 status for an invalid route", async () => {
        const response = await request.get("/analytics/invalid-route");
        expect(response.status).toBe(404);
    });
});

describe("GET /analytics/sales", () => {
    it("should respond to the GET method", async () => {
        const response = await request.get("/analytics/sales");
        expect(response.status).toBe(200);
    });
});

describe("GET /analytics/sales/monthly", () => {
    it("should respond to the GET method", async () => {
        const response = await request.get("/analytics/sales/monthly");
        expect(response.status).toBe(200);
    });
});

describe("GET /analytics/sales/quarterly", () => {
    it("should respond to the GET method", async () => {
        const response = await request.get("/analytics/sales/quarterly");
        expect(response.status).toBe(200);
    });
});

describe("GET /analytics/sales/yearly", () => {
    it("should respond to the GET method", async () => {
        const response = await request.get("/analytics/sales/yearly");
        expect(response.status).toBe(200);
    });
});

describe("GET /analytics/sales/comparison", () => {
    it("should respond to the GET method", async () => {
        const response = await request.get("/analytics/sales/comparison?start1=2024-01-01&end1=2024-12-30&start2=2023-01-01&end2=2023-06-30");
        expect(response.status).toBe(200);
    });
});

describe("GET /analytics/sales/product/:productid", () => {
    it("should respond to the GET method", async () => {
        const productID = 1;
        const response = await request.get(`/analytics/sales/product/${productID}`);
        expect(response.status).toBe(200);
    });
});

describe("GET /analytics/sales/product/:productid/monthly", () => {
    it("should respond to the GET method", async () => {
        const productID = 1;
        const response = await request.get(`/analytics/sales/product/${productID}/monthly`);
        expect(response.status).toBe(200);
    });
});

describe("GET /analytics/sales/product/:productid/quarterly", () => {
    it("should respond to the GET method", async () => {
        const productID = 1;
        const response = await request.get(`/analytics/sales/product/${productID}/quarterly`);
        expect(response.status).toBe(200);
    });
});

describe("GET /analytics/sales/product/:productid/yearly", () => {
    it("should respond to the GET method", async () => {
        const productID = 1;
        const response = await request.get(`/analytics/sales/product/${productID}/yearly`);
        expect(response.status).toBe(200);
    });
});

describe("GET /analytics/sales/product/:productid/comparison", () => {
    it("should respond to the GET method", async () => {
        const productID = 1;
        const response = await request.get(`/analytics/sales/product/${productID}/comparison?start1=2024-01-01&end1=2024-12-30&start2=2023-01-01&end2=2023-06-30`);
        expect(response.status).toBe(200);
    });
});

describe("GET /analytics/sales/category/:categoryid", () => {
    it("should respond to the GET method", async () => {
        const categoryID = 1;
        const response = await request.get(`/analytics/sales/category/${categoryID}`);
        expect(response.status).toBe(200);
    });

    it("should respond to the GET method", async () => {
        const subCategoryID = 6;
        const response = await request.get(`/analytics/sales/category/${subCategoryID}`);
        expect(response.status).toBe(200);
    });
});

describe("GET /analytics/sales/category/:categoryid/monthly", () => {
    it("should respond to the GET method", async () => {
        const categoryID = 1;
        const response = await request.get(`/analytics/sales/category/${categoryID}/monthly`);
        expect(response.status).toBe(200);
    });

    it("should respond to the GET method", async () => {
        const subCategoryID = 6;
        const response = await request.get(`/analytics/sales/category/${subCategoryID}/monthly`);
        expect(response.status).toBe(200);
    });
});

describe("GET /analytics/sales/category/:categoryid/quarterly", () => {
    it("should respond to the GET method", async () => {
        const categoryID = 1;
        const response = await request.get(`/analytics/sales/category/${categoryID}/quarterly`);
        expect(response.status).toBe(200);
    });

    it("should respond to the GET method", async () => {
        const subCategoryID = 6;
        const response = await request.get(`/analytics/sales/category/${subCategoryID}/quarterly`);
        expect(response.status).toBe(200);
    });
});

describe("GET /analytics/sales/category/:categoryid/yearly", () => {
    it("should respond to the GET method", async () => {
        const categoryID = 1;
        const response = await request.get(`/analytics/sales/category/${categoryID}/yearly`);
        expect(response.status).toBe(200);
    });

    it("should respond to the GET method", async () => {
        const subCategoryID = 6;
        const response = await request.get(`/analytics/sales/category/${subCategoryID}/yearly`);
        expect(response.status).toBe(200);
    });
});

describe("GET /analytics/sales/category/:categoryid/comparison", () => {
    it("should respond to the GET method", async () => {
        const categoryID = 1;
        const response = await request.get(`/analytics/sales/category/${categoryID}/comparison?start1=2024-01-01&end1=2024-12-30&start2=2023-01-01&end2=2023-06-30`);
        expect(response.status).toBe(200);
    });

    it("should respond to the GET method", async () => {
        const subCategoryID = 6;
        const response = await request.get(`/analytics/sales/category/${subCategoryID}/comparison?start1=2024-01-01&end1=2024-12-30&start2=2023-01-01&end2=2023-06-30`);
        expect(response.status).toBe(200);
    });
});

describe("GET /analytics/salesByProvince", () => {
    it("should respond to the GET method", async () => {
        const response = await request.get("/analytics/salesByProvince");
        expect(response.status).toBe(200);
    });
});

describe("GET /analytics/salesByCity", () => {
    it("should respond to the GET method", async () => {
        const response = await request.get("/analytics/salesByCity");
        expect(response.status).toBe(200);
    });
});

describe("GET /analytics/salesByCountry", () => {
    it("should respond to the GET method", async () => {
        const response = await request.get("/analytics/salesByCountry");
        expect(response.status).toBe(200);
    });
});

describe("GET /analytics/product/lowStock", () => {
    it("should respond to the GET method", async () => {
        const response = await request.get("/analytics/product/lowStock");
        expect(response.status).toBe(200);
    });
});

describe("GET /analytics/product/bestSellers", () => {
    it("should respond to the GET method", async () => {
        const response = await request.get("/analytics/product/bestSellers");
        expect(response.status).toBe(200);
    });
});

describe("GET /analytics/product/mostViewed", () => {
    it("should respond to the GET method", async () => {
        const response = await request.get("/analytics/product/mostViewed");
        expect(response.status).toBe(200);
    });
});

describe("GET /analytics/discountEffectiveness", () => {
    it("should respond to the GET method", async () => {
        const response = await request.get("/analytics/discountEffectiveness");
        expect(response.status).toBe(200);
    });
});

describe("GET /analytics/user/topBuyers", () => {
    it("should respond to the GET method", async () => {
        const response = await request.get("/analytics/user/topBuyers");
        expect(response.status).toBe(200);
    });
});

describe("GET /analytics/user/churnRate", () => {
    it("should respond to the GET method", async () => {
        const response = await request.get("/analytics/user/churnRate");
        expect(response.status).toBe(200);
    });
});

describe("GET /analytics/inventory", () => {
    it("should respond to the GET method", async () => {
        const response = await request.get("/analytics/inventory");
        expect(response.status).toBe(200);
    });
});

describe("GET /analytics/inventory/reorder", () => {
    it("should respond to the GET method", async () => {
        const response = await request.get("/analytics/inventory/reorder");
        expect(response.status).toBe(200);
    });
});

describe("GET /analytics/returns/summary", () => {
    it("should respond to the GET method", async () => {
        const response = await request.get("/analytics/returns/summary");
        expect(response.status).toBe(200);
    });
});

describe("GET /analytics/returns/byReason", () => {
    it("should respond to the GET method", async () => {
        const response = await request.get("/analytics/returns/byReason");
        expect(response.status).toBe(200);
    });
});