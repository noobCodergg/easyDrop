const {
  createTransaction,
  getTransaction,
  updateTransaction,
  getSummary,
} = require("./transaction.controller");

const router = require("express").Router();

module.exports = (app) => {
  router.post("/create-transaction", createTransaction);
  router.get(
    "/get-transactions/:fromDate?/:toDate?/:category?/:remarks?",
    getTransaction
  );
  router.put("/update-transaction/:id", updateTransaction);
  router.get("/get-summary", getSummary);
  return app.use("/api/transaction", router);
};
