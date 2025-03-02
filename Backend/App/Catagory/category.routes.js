const { createCategory, getCategory } = require("./category.controller");

const router = require("express").Router();

module.exports = (app) => {
  router.post("/createcategory", createCategory);
  router.get("/getcategory", getCategory);

  return app.use("/api/category", router);
};
