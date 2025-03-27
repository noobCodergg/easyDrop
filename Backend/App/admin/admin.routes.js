
const { adminOrders, getCancelledOrders, updateCancelledOrderDamageStatus } = require('./admin.controller')

const router = require("express").Router();

module.exports = (app) => {
  router.get('/admin-order',adminOrders)
  router.get('/get-cancelled-orders',getCancelledOrders)
  router.put('/update-damaged-status/:orderId',updateCancelledOrderDamageStatus)
  return app.use("/api/admin", router);
};