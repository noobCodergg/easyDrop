const db=require('../config/db')
const {printError}=require('../helpers/controllerProfile')
const {statusCode}=require('../helpers/httpStatusCode')
const validateApiFields=require('../helpers/validateApiKeys')

const adminOrders=async(req,res)=>{
    try {
      const { startDate, endDate } = req.query; 
  
      console.log(startDate,endDate)
      
     if (!validateApiFields({ startDate,endDate })) {
      printError("Api Field(s) Errors", "createTransaction");
      return res.status(statusCode.BAD_REQUEST).json({
        flag: "FAIL",
        msg: "Api Field(s) Errors",
      });
    }
  
      const orders = await db("orders")
        .select(
          "orders.date AS Order_Date",
          "order_info.id AS ORD_ID",
          db.raw(`CONCAT_WS("-", "P", orders.product_id, orders.variant_id) AS Product_Id`),
          "products.name AS Product_Name",
          db.raw(`CONCAT_WS(": ", product_variants.variant_type, product_variants.variant) AS Variant`),
          "product_categories.category AS Category",
          "orders.quantity AS Quantity",
          "products.buying_price AS Buying_Price",
          "products.resell_price AS Resell_Price",
          "products.retail_price AS Retail_Price",
          "order_info.cod AS COD",
          "order_info.delivery_charge AS Delivery_Charge",
          db.raw(`ROUND(products.resell_price - products.buying_price, 2) AS Easydrop_Margin`),
          db.raw(`
            ROUND(((order_info.cod - order_info.delivery_charge - products.resell_price) - (order_info.cod * 0.015)), 2) AS Dropshipper_Margin
          `),
          
          "order_info.order_by",
          db("users").select("username").whereRaw("users.id = order_info.order_by").as("Dropshipper")
        )
        .leftJoin("products", "orders.product_id", "products.id")
        .leftJoin("product_variants", "orders.variant_id", "product_variants.id")
        .leftJoin("order_info", "orders.order_id", "order_info.id")
        .leftJoin("product_categories", "products.category_id", "product_categories.id")
        .leftJoin("delivery_info", "orders.order_id", "delivery_info.order_id")
        .whereBetween("orders.date", [startDate, endDate]);
  
      return res.json({
        flag:"SUCCESS",
        data:orders
      });
    } catch (error) {
      catchBlockCodes(error)
    }
  }

  module.exports={adminOrders}