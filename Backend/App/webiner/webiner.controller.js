const db = require("../config/db");
const moment = require("moment-timezone");
const printError = require("../helpers/controllerProfile");
const validateApiFields = require("../helpers/validateApiKeys");
const { catchBlockCodes } = require("../helpers/catchBlockCodes");
const { statusCode } = require("../helpers/httpStatusCode");

const postWebinerRequest = async (req, res) => {
  try {
    const { inputdata } = req.body;

    const { email, phone, remarks } = inputdata;

    if (!validateApiFields({ email, phone })) {
      printError("Api Field(s) Errors", "createTransaction");
      return res.status(statusCode.BAD_REQUEST).json({
        flag: "FAIL",
        msg: "Api Field(s) Errors",
      });
    }

    const datetime = moment().format("YYYY-MM-DD HH:mm:ss");

    const data = await db("webinarrequest").insert({
      email,
      phone,
      remarks,
      datetime,
    });

    return res.status(statusCode.OK).json({
      flag: "SUCCESS",
      data: data,
    });
  } catch (error) {
    catchBlockCodes(res, error);
  }
};

const getWebinarList = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let query = db("webinarrequest").select("*").orderBy("datetime", "desc");

    if (startDate && endDate) {
      query = query
        .whereBetween("datetime", [startDate, endDate])
        .orderBy("datetime", "desc");
    }

    const response = await query;

    res.status(statusCode.OK).json({
      flag: "SUCCESS",
      data: response,
    });
  } catch (error) {
    catchBlockCodes(res, error);
  }
};

const updateWebinarStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { value } = req.body;

    if (!validateApiFields({ id, value })) {
      printError("Api Field(s) Errors", "createTransaction");
      return res.status(statusCode.BAD_REQUEST).json({
        flag: "FAIL",
        msg: "Api Field(s) Errors",
      });
    }
    const updatedValue = await db("webinarrequest")
      .update({ status: value })
      .where({ id: id });
    res.status(statusCode.OK).json({
      flag: "SUCCESS",
      data: updatedValue,
    });
  } catch (error) {
    catchBlockCodes(error);
  }
};

module.exports = { postWebinerRequest, getWebinarList, updateWebinarStatus };
