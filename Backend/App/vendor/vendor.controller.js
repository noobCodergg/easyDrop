const db = require("../config/db");
const { statusCode } = require("../helpers/httpStatusCode");
const { catchBlockCodes } = require("../helpers/catchBlockCodes");
const validateApiFields = require("../helpers/validateApiKeys");
const { printError } = require("../helpers/controllerProfile");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken')
require("dotenv").config();


const createVendor = async (req, res) => {
  try {
    const { formData } = req.body;
    
    if (!validateApiFields({ formData })) {
        printError("Api Field(s) Errors", "createTransaction");
        return res.status(statusCode.BAD_REQUEST).json({
          flag: "FAIL",
          msg: "Api Field(s) Errors",
        });
      }

    if (!formData.password || formData.password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters long" });
    }

    const existingUser = await db("users")
      .where({ email: formData.email })
      .first();

    if (existingUser) {
      return res.status(400).json({ error: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(formData.password, 10);

    await db("users").insert({
      name: formData.name,
      email: formData.email,
      nid: formData.nid,
      phone_number: formData.phoneNumber, 
      password: hashedPassword, 
    });

    return res.status(statusCode.OK).json({
        flag: "SUCCESS",
        msg: "User Created Successfully",
      });
    } catch (err) {
      catchBlockCodes(res, err);
    }
};

const vendorLogin = async (req, res) => {
    try {
        const { formData } = req.body;

        if (!validateApiFields(formData)) {
            console.error("API Field(s) Errors in vendorLogin");
            return res.status(400).json({
                flag: "FAIL",
                msg: "API Field(s) Errors",
            });
        }

   
        const existingUser = await db("users").where({ phone_number: formData.phoneNumber }).first();

        if (!existingUser) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(formData.password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

       
        const token = jwt.sign(
            { id: existingUser.id, email: existingUser.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: "7d" } 
        );

       
        res.cookie("token", token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production", 
            sameSite: "Strict", 
            maxAge: 7 * 24 * 60 * 60 * 1000, 
        });

        
        res.status(statusCode.ok).json({
            flag:"SUCCESS",
            message: "Login successful",
            token, 
            user: {
                id: existingUser.id,
                name: existingUser.name,
                email: existingUser.email
            }
        });

    } catch (err) {
        catchBlockCodes(res,err)
    }
};

module.exports = {
  createVendor,vendorLogin
};
