
# Zad à Dos E-Commerce Backend

Welcome to the backend repository for Zad à Dos, an e-commerce website designed for selling bags. This project was developed as part of the CS-308 course at Sabanci University. The backend is built using Express.js and MySQL to deliver a scalable and efficient system for managing e-commerce operations.


## Project Overview

he backend of Zad à Dos provides essential functionalities for managing users, products, orders, and more. It enables seamless integration with the front-end, ensuring a smooth experience for end-users. This guide details how to set up, run, and contribute to the project.

---

## Team Members
- Nuh Al-Sharafi
- Musab Ahmed Khan
- Guanghui Ma
- Muhammad Haris
- Areeb Kamal
- Cem Görkem Baysal

---

## Features

- **User Authentication and Authorization:** Secure sign-up and sign-in processes with role-based access control, allowing for clear distinction between customer and administrator privileges.
- **Product Management:** A full suite of CRUD operations for products, enabling administrators to add, update, remove, and retrieve products with ease.
- **Order Processing:** Robust order management system that allows customers to place orders, and admins to process them through a streamlined workflow.
- **Shopping Cart:** Persistent shopping cart functionality, complete with add-to-cart, update quantities, and remove items features.
- **Payments Integration:** Integration with payment gateways like Stripe for handling transactions and supporting various payment methods.
- **Discounts and Coupons:** Dynamic coupon creation and application system to offer discounts and promotions to customers.
- **Reviews and Ratings:** Users can leave reviews and rate products, fostering community engagement and providing valuable feedback.
- **Wishlist:** Customers can create and manage wishlists, bookmarking their favorite items for future purchase.
- **Scalable Architecture:** Designed with best practices in mind, ensuring that the backend can scale with the growing needs of the business.

---

## Built With
- **Express.js** - A minimal and flexible Node.js web application framework.
- **MySQL** - A relational database management system.

---

## Getting Started
Follow the instructions below to set up and run the backend server on your local machine.

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v16.x or higher)
- **npm** (comes with Node.js)
- **MySQL**


---

## Setting Up the Backend Server

### Clone the Repository
```bash
git clone <https://github.com/pishmish/laback>
cd <laback>
```

### Install Dependencies
```bash
npm install
```

### Start the Server
To start the development server, run:
```bash
npm run dev
```
The server runs on **port 5001** by default.

To stop the server, use `CTRL + C`.

---

## Setting Up the Database

### Prerequisites
- Install and run MySQL on your computer.

### Initialize the Database
Navigate to the `./laback/DB` directory in your terminal and execute the following commands:

1. **Create tables:**
   ```bash
   mysql -u root -p < setup.sql
   ```

2. **Populate tables with sample data:**
   ```bash
   mysql -u root -p < sampleData.sql
   ```

3. **Reset the database:**
   ```bash
   mysql -u root -p < reset.sql
   ```

---

## Configuring the Environment Variables

Create a `.env` file in the root directory and populate it with the following variables:
```env
MYSQL_HOST=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DB=
MYSQL_DIALECT= # e.g., 'mysql' for Sequelize

NODE_ENV=development

JWT_SECRET=
JWT_EXPIRE=
JWT_COOKIE=

MAIL_PASSWORD= # for the mail transporter
```
Fill in the appropriate values based on your local setup and environment.

---

## API Endpoints

### Address API
- `GET /` - Welcome route for Address API.
- `GET /id/:addressid` - Fetch address by ID.
- `GET /uname/:username` - Fetch addresses of customers for delivery (restricted to product managers).
- `GET /personal` - Fetch personal addresses of the logged-in customer.
- `POST /newaddress` - Add a new address.
- `PUT /:addressid` - Update address details.
- `DELETE /:addressid` - Delete an address.

### Analytics API
- `GET /` - Welcome route for Analytics API.
- `GET /sales` - Fetch daily sales data for all products (restricted to sales managers).
- `GET /sales/monthly` - Fetch monthly sales data for all products.
- `GET /sales/quarterly` - Fetch quarterly sales data for all products.
- `GET /sales/yearly` - Fetch yearly sales data for all products.
- `GET /sales/comparison` - Compare sales between two periods.
- `GET /sales/product/:productid` - Fetch daily sales data for a specific product.
- `GET /sales/product/:productid/monthly` - Fetch monthly sales data for a specific product.
- `GET /sales/product/:productid/quarterly` - Fetch quarterly sales data for a specific product.
- `GET /sales/product/:productid/yearly` - Fetch yearly sales data for a specific product.
- `GET /sales/product/:productid/comparison` - Compare sales of a product between two periods.
- `GET /sales/category/:categoryid` - Fetch daily sales data for a category.

### Cart API
- `GET /` - Welcome route for Cart API.
- `POST /fetch` - Fetch or create a temporary cart.
- `POST /product/add/:productID` - Add a product to the cart.
- `POST /product/remove/:productID` - Remove a product from the cart.
- `POST /product/delete/:productID` - Delete a product from the cart.
- `POST /merge/:customerID` - Merge carts upon login.
- `PUT /permanent/:customerID` - Delete an empty permanent cart upon logout.
- `GET /products` - Fetch products in the cart.

### Delivery API
- `GET /` - Welcome route for Delivery API.
- `GET /schedule/:orderid` - Fetch delivery schedule for an order.
- `POST /schedule` - Schedule a new delivery.

### Images API
- `GET /` - Welcome route for Images API.
- `POST /upload` - Upload a new product image.
- `DELETE /:imageid` - Delete an image by ID.

### Invoice API
- `GET /` - Welcome route for Invoice API.
- `GET /:orderid` - Fetch invoice for an order.
- `POST /generate` - Generate a new invoice.

### Order API
- `GET /` - Welcome route for Order API.
- `GET /getorder/:id` - Fetch order by ID.
- `GET /getorder/date` - Fetch orders within a date range.
- `GET /getallorders` - Fetch all orders (restricted to product managers).
- `GET /user` - Fetch orders of the logged-in user.
- `GET /supplier/:username` - Fetch supplier orders (restricted to sales and product managers).
- `GET /purchaseprice/:orderid/:productid` - Fetch the purchase price of a product in an order.
- `POST /neworder` - Place a new order.
- `PUT /updateorder/:id` - Update order details.
- `PUT /cancelorder/:id` - Cancel an order (restricted to customers).
- `PUT /orderitems/:id` - Update order items.
- `DELETE /orderitems/:id` - Delete order items.

### Payment API
- `GET /` - Welcome route for Payment API.
- `POST /process` - Process a payment (restricted to customers).
- `POST /refund/:id` - Process a refund (restricted to sales managers).

### Returns API
- `GET /` - Welcome route for Returns API.
- `GET /all` - Fetch all return requests (restricted to sales managers).
- `GET /request/:id` - Fetch a return request by ID.
- `GET /request/:id/status` - Fetch the status of a return request.
- `POST /newrequest` - Create a new return request (restricted to customers).
- `PUT /request/:id` - Update a return request.
- `PUT /request/:id/status` - Update the status of a return request (restricted to sales and product managers).
- `DELETE /request/:id` - Delete a return request (restricted to customers).
- `POST /request/:id/authorizepayment` - Authorize payment for a return (restricted to sales managers).
- `GET /request/:id/cost` - Fetch the cost of a return request.
- `GET /request/customer/:username` - Fetch return requests for a customer.

### Sales Manager API
- `GET /` - Welcome route for Sales Manager API.
- `GET /reports` - Fetch sales reports.
- `POST /report/generate` - Generate a custom sales report.

### Store API
- `GET /` - Welcome route for Store API.
- `GET /all` - Fetch all stores.
- `GET /:storeid` - Fetch details of a specific store.

### User API
- `GET /` - Welcome route for User API.
- `POST /login` - Login a user.
- `POST /register` - Register a new user.
- `GET /:userid` - Fetch user details.
- `PUT /:userid` - Update user details.

### Wishlist API
- `GET /` - Welcome route for Wishlist API.
- `POST /customer/:customerID` - Create or fetch a wishlist for a customer.
- `POST /customer/:customerID/product/:productID` - Add a product to the wishlist.
- `DELETE /customer/:customerID/product/:productID` - Remove a product from the wishlist.
- `DELETE /customer/:customerID` - Delete a customer's wishlist.
- `GET /product/:productID` - Fetch wishlists containing a specific product.
- `GET /:id` - Fetch a wishlist by ID.
- `POST /sendMail` - Send a wishlist email for products on sale.
- `GET /check/:customerID/:productID` - Check if a product exists in a customer's wishlist.

---

## Contributing
Contributions from team members are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes with clear and descriptive messages.
4. Open a pull request for review.

---

## Contact
For questions or feedback, feel free to contact the team:

areeb.kamal@sabanciuniv.edu

cemgorkem@sabanciuniv.edu

guanghui.ma@sabanciuniv.edu

haris.mehboob@sabanciuniv.edu

musab.khan@sabanciuniv.edu

nuh.sharafi@sabanciuniv.edu


