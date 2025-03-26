
const { adminOrders, getCancelledOrders } = require('./admin.controller')

const router = require("express").Router();

module.exports = (app) => {
  router.get('/admin-order',adminOrders)
  router.get('/get-cancelled-order',getCancelledOrders)
  return app.use("/api/admin", router);
};