const { createCategory, getCategory } = require("./categoryController");

const router = require("express").Router();

module.exports = (app) => {
  router.post("/create-category", createCategory);
  router.get("/get-category", getCategory);

  return app.use("/api/category", router);
};
