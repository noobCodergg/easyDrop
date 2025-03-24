
const { getOrders, updateOrderStatus, orderDetails,  getOrdersByStatus } = require("./orders.controller");

const router = require("express").Router();

module.exports = (app) => {

  router.get('/get-orders/:userId',getOrders)
  router.put('/update-order-status/:orderId',updateOrderStatus)
  router.get('/order-details/:orderId',orderDetails)
  router.get('/get-orders-by-status/:userId',getOrdersByStatus)
  return app.use("/api/orders", router);
};
