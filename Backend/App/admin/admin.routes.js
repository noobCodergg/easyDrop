
const { adminOrders } = require('./admin.controller')

const router = require("express").Router();

module.exports = (app) => {
  router.get('/admin-order',adminOrders)
  return app.use("/api/admin", router);
};