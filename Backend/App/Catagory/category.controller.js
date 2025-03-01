const db = require("../Config/db");
const { statusCode } = require("../Helpers/httpStatusCode");

const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    await db("catagory").insert({ name }); 
    const categories = await db("catagory").select("*"); 
    res.status(statusCode.OK).json({
      status: "SUCCESS",
      data: categories,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ 
      message: "Error creating category" 
    });
  }
};

const getCategory = async (req, res) => {
  try {
    const categories = await db("catagory").select("*"); 
    res.status(statusCode.OK).json({
      flag: "SUCCESS",
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ 
      message: "Error fetching categories" 
    });
  }
};

module.exports = {
  createCategory,
  getCategory,
};
