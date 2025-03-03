const db = require("../config/db");
const { statusCode } = require("../helpers/httpStatusCode");
const { catchBlockCodes } = require("../helpers/catchBlockCodes");
const validateApiFields = require("../helpers/validateApiKeys");
const { printError } = require("../helpers/controllerProfile");

const createCategory = async (req, res) => {
  const { name } = req.body;

  // Validate required field
  if (!validateApiFields({ name })) {
    printError("Api Field(s) Errors", "createCategory");
    return res.status(statusCode.BAD_REQUEST).json({
      flag: "FAIL",
      msg: "Api Field(s) Errors",
    });
  }

  try {
    await db("category").insert({ name }); // Fixed typo: catagory → category
    const categories = await db("category").select("*"); // Fixed typo: catagory → category

    return res.status(statusCode.OK).json({
      flag: "SUCCESS", // Standardized flag field name
      msg: "Category Created", // Added meaningful message
      data: categories,
    });
  } catch (err) {
    catchBlockCodes(res, err);
  }
};

const getCategory = async (req, res) => {
  try {
    const categories = await db("category").select("*"); // Fixed typo: catagory → category

    return res.status(statusCode.OK).json({
      flag: "SUCCESS",
      msg: "Categories Retrieved", // Added meaningful message
      data: categories,
    });
  } catch (err) {
    catchBlockCodes(res, err);
  }
};

module.exports = {
  createCategory,
  getCategory,
};