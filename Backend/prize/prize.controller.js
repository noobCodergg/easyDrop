const db=require('../config/db')
const moment=require('moment-timezone')
const {printError}=require('../helpers/controllerProfile')
const {catchBlockCodes}=require('../helpers/catchBlockCodes')
const {statusCode}=require('../helpers/httpStatusCode')
const validateApiFields=require('../helpers/validateApiKeys')

const getPrizes = async(req,res)=>{
    try{
        const response = await db('prize').select('*');
        console.log(response)
        res.status(statusCode.OK).json({
            flag:"SUCCESS",
            data:response
        })
    }catch(error){
        catchBlockCodes(res,error)
    }
}

const updatePrize = async (req, res) => {
    try {
      const { id, value } = req.body;
      console.log(id,value)
      
      if (typeof id === 'undefined' || typeof value === 'undefined') {
        return res.status(400).json({ message: 'ID and value are required.' });
      }
  
     
      await db('prize')
        .where({ id })
        .update({ visible: value });
  
      res.status(200).json({ message: 'Prize visibility updated successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error while updating prize.' });
    }
  };


  const postPrize = async (req, res) => {
    try {
      const created_at = moment().format("YYYY-MM-DD");
      const updated_at = created_at;
      const visible = 0;
      const { name } = req.body;
  
      const response = await db('prize').insert({
        prize_name: name, 
        created_at,
        updated_at,
        visible,
      });
  
      res.status(200).json({
        flag: "SUCCESS",
        message: "Prize inserted successfully",
        data: response
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ flag: "ERROR", message: "Something went wrong" });
    }
  }
  
  

module.exports={getPrizes,updatePrize,postPrize}