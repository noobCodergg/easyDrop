
const { getOrders, updateOrderStatus, orderDetails, adminOrders } = require("./orders.controller");

const router = require("express").Router();

module.exports = (app) => {

  router.get('/get-orders/:userId',getOrders)
  router.put('/update-order-status/:orderId',updateOrderStatus)
  router.get('/order-details/:orderId',orderDetails)
  router.get('/admin-order',adminOrders)
  return app.use("/api/orders", router);
};
