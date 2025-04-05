const { createCategory, getCategory } = require("./category.controller");

const router = require("express").Router();

module.exports = (app) => {
  router.post("/create-category", createCategory);
  router.get("/get-category", getCategory);

  return app.use("/api/category", router);
};
