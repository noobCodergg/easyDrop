const db = require("../config/db");
const { statusCode } = require("../helpers/httpStatusCode");
const { catchBlockCodes } = require("../helpers/catchBlockCodes");
const validateApiFields = require("../helpers/validateApiKeys");
const { printError } = require("../helpers/controllerProfile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

    const existingUser = await db("vendors")
      .where({ email: formData.email })
      .first();

    if (existingUser) {
      return res.status(400).json({ error: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(formData.password, 10);

    await db("vendors").insert({
      name: formData.name,
      email: formData.email,
      nid: formData.nid,
      phone: formData.phoneNumber,
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

    const existingUser = await db("vendors")
      .where({ phone: formData.phoneNumber })
      .first();

    if (!existingUser) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(
      formData.password,
      existingUser.password
    );
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

    res.status(statusCode.OK).json({
      flag: "SUCCESS",
      message: "Login successful",
      token,
      user: {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
      },
    });
  } catch (err) {
    catchBlockCodes(res, err);
  }
};

const getVendorDetail = async (req, res) => {
  try {
    const { vendorId } = req.params;

    const vendorDetails = await db("vendors")
      .where({ id: vendorId })
      .select("name",
      "email" ,
      "phone" ,
      "nid" ,
      "house_no",
      "block" ,
      "road" ,
      "area" ,
      "city" ,
      "shop_name" ,
      "shop_email",
      "shop_phone" ,
      "shop_no" ,
      "shop_block" ,
      "shop_road" ,
      "shop_area" ,
      "shop_city" )

    if (vendorDetails.length === 0) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    res.json(vendorDetails[0]); // Send the vendor details
  } catch (error) {
    console.error("Error fetching vendor details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const updatePersonalDetail = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const { personalDetail } = req.body;

    const updatedVendor = await db("vendors")
      .where({ id: vendorId })
      .update({
        name: personalDetail.name,
        email: personalDetail.email,
        phone: personalDetail.phone,
        house_no:personalDetail.house_no,
        block:personalDetail.block,
        road:personalDetail.road,
        area:personalDetail.area,
        city:personalDetail.city
       
      });

      res.status(statusCode.OK).json({
        flag:"SUCCESS",
        data:updatedVendor
      })
  } catch (error) {
    console.log(error);
  }
};

const updateShopDetail=async(req,res)=>{
  try{
    const {vendorId}=req.params;
    const {shopDetail}=req.body;

    const updatedShop=await db("vendors")
    .where({id:vendorId})
    .update({shop_name:shopDetail.shopName,
      shop_phone:shopDetail.shopPhone,
      shop_email:shopDetail.shopEmail,
      shop_no:shopDetail.shopNo,
      shop_road:shopDetail.shopRoad,
      shop_area:shopDetail.shopArea,
      shop_city:shopDetail.shopCity,
      
    })

    res.status(statusCode.OK).json({
      flag:"SUCCESS",
      data:updatedShop
    })
  }catch(err){
    console.log(err)
  }
}

module.exports = {
  createVendor,
  vendorLogin,
  getVendorDetail,
  updatePersonalDetail,
  updateShopDetail
};
