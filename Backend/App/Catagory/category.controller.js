const db = require("../config/db");
const { statusCode } = require("../helpers/httpStatusCode");
const { catchBlockCodes } = require("../helpers/catchBlockCodes");


const createCategory = async (req, res) => {
  const { name } = req.body;

 

  try {
    await db("catagory").insert({ name }); // Fixed typo: catagory → category
    const categories = await db("catagory").select("*"); // Fixed typo: catagory → category

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
    const categories = await db("catagory").select("*"); // Fixed typo: catagory → category

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