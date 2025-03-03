const db = require("../config/db");
const { statusCode } = require("../helpers/httpStatusCode");
const {catchBlockCodes}=require("../helpers/catchBlockCodes")
const validateApiFields=require("../helpers/validateApiKeys")

const createCategory = async (req, res) => {
  const { name } = req.body;

  const isValid=validateApiFields({name});

  if(!isValid){
		printError('Api Field(s) Errors', __error_function)
		return res.status(statusCode.BAD_REQUEST)
		.send({
			flag: 'FAIL',
			msg: "Api Field(s) Errors"
		})
	}
  
  try {
    await db("catagory").insert({ name }); 
    const categories = await db("catagory").select("*"); 
    res.status(statusCode.OK).json({
      status: "SUCCESS",
      data: categories,
    });
  } catch (err) {
    catchBlockCodes(res,err)
  }
};

const getCategory = async (req, res) => {
  try {
    const categories = await db("catagory").select("*"); 
    res.status(statusCode.OK).json({
      flag: "SUCCESS",
      data: categories,
    });
  } catch (err) {
    catchBlockCodes(res,err)
  }
};

module.exports = {
  createCategory,
  getCategory,
};
