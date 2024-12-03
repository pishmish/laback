 store
  GET /product/
  GET /prodcut/:id
  POST /product/ (admin)
  PUT /product/:id (admin)
  DELETE /product/:id (admin)
  ----------
  GET /category
  GET /category/:name
  POST /category/ (admin)
  PUT /category/:id
  DELETE /category/:id
  GET /category/:name/products
  -----------
  GET /product/:id/reviews
  GET /product/:id/reviews/:reviewid
  POST /product/:id/reviews
  PUT /product/:id/reviews/:reviewid
  DELETE /reviews/:reviewid
  -----
  GET /search?q=
  -----
  POST /sort?sortBy=&sortOrder=
cart
  GET /fetch
  -----------
  POST /product/:productID
  PUT /product/:productID
  DELETE /product/:productID
  POST /merge/:customerID
  PUT /permanent/:customerID
user
  POST /register
  POST /login 
  GET /profile (only for customers)
  PUT /profile
  DELETE /removeuser
  ----------- (billing) (only for customer user)
  GET /billing/ (gets all billing profiles for customer)
  GET /billing/:billingid
  POST /billing
  PUT /billing/:billingid
  DELETE /billing/:billingid
address (auth)
  GET /id/:addressid
  POST /newaddress
  PUT /:addressid
  DELETE /:addressid
  GET /uname/:username
order
  GET /getorder/:id
  GET /user (gets all orders for a given user)
  GET /supplier (orders linked to a certain supplier)
  POST /neworder
  PUT /updateorder/:id (no need to update status)
  PUT /cancelorder/:id
  DELETE /orderitems/:id
  PUT /orderitems/:id
  GET /purchaseprice/:orderid/:productid
payment
  POST /new
delivery
  GET /estimate/:id
  PUT /estimate/:id
  GET /order/courier/:courierid (orders linked to a certain courier)
  GET /order/:id (only for courier, returns specific info)
  PUT /order/:id/status
  GET /order/:id/status
invoice
  GET /mail/:id/:email
  GET /download/:id
(we're only obligated to this point for the demo)
wishlist
  GET /:id
  GET /:itemid (get wishlists with specific item)
  POST /:id/:itemid
  PUT /:id/:itemid
  GET /:userid (get wishlist for given user)
  DELETE /:id
analytics
  GET /sales
  GET /sales/:productid
  GET /sales/byregion (optional)
  GET /sales/:categoryid
  -----------
  GET /product/lowstock
  GET /product/bestsellers
  GET /product/mostviewed
returns
  GET /
  GET /:id
  GET /:id/status
  POST /
  PUT /:id
  PUT /:id/status
  DELETE /:id
productManager
  GET /product/stock
  GET /dashboard
  PUT /product/:id/stock
  POST /product
  PUT /product (update product details)
  POST /requestfordelivery/:orderid
  DELETE /product/:id (set showProduct to false)
  -----------
  GET /order
  GET /order/pending
  PUT /order/:id/updatestatus
salesManager
  GET /product/price
  GET /dashboard
  PUT /product/:id/price
  GET /product/discount
  PUT /product/:id/discount (setting, updating and removing)
admin (not required at all)
  GET /users
  GET /orders
  GET /products
  GET /dashboard

  
  
