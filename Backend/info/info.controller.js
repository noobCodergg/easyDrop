const db = require('../config/db');
const moment = require('moment-timezone');
const { printError } = require('../helpers/controllerProfile');
const { catchBlockCodes } = require('../helpers/catchBlockCodes');
const { statusCode } = require('../helpers/httpStatusCode');
const validateApiFields = require('../helpers/validateApiKeys');

const postInfo = async (req, res) => {
    try {
        const createdAt = moment().format("YYYY-MM-DD");
        const { phone, email, result } = req.body;
        console.log(phone, email, result);

        // Check if user already exists
        const existingUser = await db('info')
            .where({ phone })
            .first();

        if (existingUser) {
           return res.status(200).json("Exist")
        } else {
            // User doesn't exist, create a new one
            const response = await db('info').insert({
                phone,
                email,
                prize: result,
                createdAt,
            });

            return res.status(201).json({
                message: "New user created successfully.",
                data: response,
                created: true,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while processing the request.",
            error: error.message,
        });
    }
};



const getInfo = async (req,res)=>{
    try{
        const response = await db('info').select('*').orderBy('createdAt', 'desc');
        res.status(statusCode.OK).json({
            flag:"SUCCESS",
            data:response
        })
    }catch(error){
        console.log(error)
    }
}

const isuserExist = async (req, res) => {
    
   
    try {
        const { phone } = req.params;
        console.log(phone)
      const user = await db('info').select('*').where({ phone} ).first();
  
      if (user) {
        return res.status(200).json({ exists: true });
      } else {
        return res.status(200).json({ exists: false });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error checking user existence.",
        error: error.message,
      });
    }
  };
  

module.exports = { postInfo,getInfo,isuserExist };
