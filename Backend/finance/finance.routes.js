const { getFinancialSummary } = require("./finance.controller");


const router = require("express").Router();

module.exports = (app) => {
  router.get('/get-finance/:startDate?/:endDate?',getFinancialSummary)

  return app.use("/api/finance", router);
};