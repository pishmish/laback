store
  GET /product/
  GET /prodcut/:id
  POST /product/ (admin)
  PUT /product/:id (admin)
  PUT /product/price/:id (admin : salesManager)
  DELETE /product/:id (admin)
  PUT /product/popularity/:id (automatic, for click based popularity system)
  ----------
  GET /category/main
  GET /category/sub
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
  GET /getorder/date (get orderIDs within a date range )
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
  POST /refund
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
  POST /customer/:customerID
  POST /customer/:customerID/product/:productID
  DELETE /customer/:customerID/product/:productID
  DELETE /customer/:customerID
  GET /product/:productID (get wishlists with specific item)
  GET /:id (get wishlist with wishlistID)
  POST /sendMail
analytics
  GET /sales
  GET /sales/monthly
  GET /sales/quarterly
  GET /sales/yearly
  GET /sales/comparison
  GET /sales/product/:productid
  GET /sales/product/:productid/monthly
  GET /sales/product/:productid/quarterly
  GET /sales/product/:productid/yearly
  GET /sales/product/:productid/comparison
  GET /sales/category/:categoryid
  GET /sales/category/:categoryid/monthly
  GET /sales/category/:categoryid/quarterly
  GET /sales/category/:categoryid/yearly
  GET /sales/category/:categoryid/comparison
  GET /sales/getprofitloss/:period
  GET /salesByProvince
  GET /salesByCity
  GET /salesByCountry
  -----------
  GET /discountEffectiveness
  -----------
  GET /product/lowStock
  GET /product/bestSellers
  GET /product/mostViewed
  -----------
  GET /user/topBuyers
  GET /user/churnRate
  -----------
  GET /inventory
  GET /inventory/reorder
returns & refunds
  GET /all
  GET /request/:id
  GET /request/:id/status
  POST /newrequest
  PUT /request/:id
  PUT /request/:id/status
  DELETE /:id
  GET /request/:id/cost
  GET /request/customer/:username
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
  PUT /discount/:id (productID duh)

  * the below are theoretical endpoints made before
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

  
  
