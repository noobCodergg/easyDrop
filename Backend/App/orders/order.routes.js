
const { getOrders, updateOrderStatus, orderDetails } = require("./orders.controller");

const router = require("express").Router();

module.exports = (app) => {

  router.get('/get-orders/:userId',getOrders)
  router.put('/update-order-status/:orderId',updateOrderStatus)
  router.get('/order-details/:orderId',orderDetails)
  return app.use("/api/orders", router);
};
