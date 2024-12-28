
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

### Store
- **Product Management**
  - `GET /product/` - Fetch all products.
  - `GET /product/:id` - Fetch a product by ID.
  - `POST /product/` - Add a new product (admin).
  - `PUT /product/:id` - Update product details (admin).
  - `PUT /product/price/:id` - Update product price (admin, sales manager).
  - `DELETE /product/:id` - Delete a product (admin).

- **Category Management**
  - `GET /category/main` - Fetch main categories.
  - `GET /category/sub` - Fetch subcategories.
  - `GET /category/:name` - Fetch category details by name.
  - `POST /category/` - Add a new category (admin).
  - `PUT /category/:id` - Update category details.
  - `DELETE /category/:id` - Delete a category.
  - `GET /category/:name/products` - Fetch products in a specific category.

- **Review Management**
  - `GET /product/:id/reviews` - Fetch reviews for a product.
  - `GET /product/:id/reviews/:reviewid` - Fetch a specific review by ID.
  - `POST /product/:id/reviews` - Add a review to a product.
  - `PUT /product/:id/reviews/:reviewid` - Update a review by ID.
  - `DELETE /reviews/:reviewid` - Delete a review by ID.

- **Search and Sorting**
  - `GET /search?q=` - Search for products.
  - `POST /sort?sortBy=&sortOrder=` - Sort products based on criteria.

### Cart
- `GET /fetch` - Fetch cart details.
- `POST /product/:productID` - Add a product to the cart.
- `PUT /product/:productID` - Update cart item details.
- `DELETE /product/:productID` - Remove a product from the cart.
- `POST /merge/:customerID` - Merge carts.
- `PUT /permanent/:customerID` - Save cart changes permanently.

### User
- `POST /register` - Register a new user.
- `POST /login` - User login.
- `GET /profile` - Fetch user profile (customers only).
- `PUT /profile` - Update user profile.
- `DELETE /removeuser` - Remove a user account.

- **Billing Management**
  - `GET /billing/` - Fetch all billing profiles for a customer.
  - `GET /billing/:billingid` - Fetch billing profile by ID.
  - `POST /billing` - Add a new billing profile.
  - `PUT /billing/:billingid` - Update billing profile by ID.
  - `DELETE /billing/:billingid` - Delete a billing profile by ID.

### Address (Auth)
- `GET /id/:addressid` - Fetch address by ID.
- `POST /newaddress` - Add a new address.
- `PUT /:addressid` - Update address details.
- `DELETE /:addressid` - Delete an address.
- `GET /uname/:username` - Fetch addresses for a user.

### Order
- `GET /getorder/:id` - Fetch an order by ID.
- `GET /getorder/date` - Fetch order IDs within a date range.
- `GET /user` - Fetch all orders for a user.
- `GET /supplier` - Fetch orders linked to a supplier.
- `POST /neworder` - Place a new order.
- `PUT /updateorder/:id` - Update an order (excluding status).
- `PUT /cancelorder/:id` - Cancel an order.
- `DELETE /orderitems/:id` - Delete order items.
- `PUT /orderitems/:id` - Update order items.
- `GET /purchaseprice/:orderid/:productid` - Fetch purchase price of a product in an order.

### Payment
- `POST /new` - Initiate a payment.
- `POST /refund` - Process a refund.

### Delivery
- `GET /estimate/:id` - Fetch delivery estimate.
- `PUT /estimate/:id` - Update delivery estimate.
- `GET /order/courier/:courierid` - Fetch orders linked to a courier.
- `GET /order/:id` - Fetch order details for a courier.
- `PUT /order/:id/status` - Update order status.
- `GET /order/:id/status` - Fetch order status.

### Wishlist
- `POST /customer/:customerID` - Create a wishlist for a customer.
- `POST /customer/:customerID/product/:productID` - Add a product to a wishlist.
- `DELETE /customer/:customerID/product/:productID` - Remove a product from a wishlist.
- `DELETE /customer/:customerID` - Delete a customer's wishlist.
- `GET /product/:productID` - Fetch wishlists containing a specific product.
- `GET /:id` - Fetch a wishlist by ID.
- `POST /sendMail` - Send wishlist via email.

### Analytics
- Sales reports:
  - `GET /sales`, `GET /sales/monthly`, `GET /sales/quarterly`, `GET /sales/yearly`, `GET /sales/comparison`
  - `GET /sales/product/:productid`, `GET /sales/category/:categoryid`
- Inventory and user analysis:
  - `GET /product/lowStock`, `GET /product/bestSellers`, `GET /user/topBuyers`

---

## Contributing
Contributions from team members are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes with clear and descriptive messages.
4. Open a pull request for review.

---

## Licensing
This project is developed for academic purposes and is not licensed for commercial use.

---

## Contact
For questions or feedback, feel free to contact the team.
