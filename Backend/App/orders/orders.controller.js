const db = require('../config/db'); // Ensure the correct path to db.js
const validateApiFields =require('../helpers/validateApiKeys')
const { printError} =require('../helpers/controllerProfile')
const {statusCode}=require('../helpers/httpStatusCode')
const {catchBlockCodes}=require('../helpers/catchBlockCodes')
const getOrders = async (req, res) => {
    try {
        
        const {userId}=req.params;

        if (!validateApiFields({ userId })) {
          printError("Api Field(s) Errors", "createTransaction");
          return res.status(statusCode.BAD_REQUEST).json({
            flag: "FAIL",
            msg: "Api Field(s) Errors",
          });
        }

        const orders = await db("orders as vo")
            .select(
                "vo.order_id",
                "vo.date",
                "vp.name as product_name",
                "vp.main_img as product_image",
                "vod.status"
            )
            .join("order_info as vod", "vo.order_id", "vod.id") // Join order details
            .join("products as vp", "vo.product_id", "vp.id") // Join products
            .where("vp.vendor_id",userId)
            

        if (orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this user" });
        }

        res.status(statusCode.OK).json(orders);
    } catch (err) {
        catchBlockCodes(res,err)
    }
};



const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params; // Get orderId from URL params
    const { status } = req.body; // Get new status from request body

    if (!validateApiFields({ orderId,status })) {
      printError("Api Field(s) Errors", "createTransaction");
      return res.status(statusCode.BAD_REQUEST).json({
        flag: "FAIL",
        msg: "Api Field(s) Errors",
      });
    }
    

    // Ensure status is provided
    if (status === undefined) {
      return res.status(400).json({ error: "Status is required" });
    }

    // Update the order status in the database
    const updatedRows = await db('order_info')
      .where('id', orderId) // Find order by order_id
      .update({ status }) 
      
    // Check if any rows were updated
    if (updatedRows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(statusCode.OK).json({ message: "Order status updated successfully", order: updatedRows[0] });
  } catch (error) {
    catchBlockCodes(res,error)
  }
};


const orderDetails=async (req,res)=>{
  try{
    const {orderId}=req.params;
    
    if (!validateApiFields({ orderId })) {
      printError("Api Field(s) Errors", "createTransaction");
      return res.status(statusCode.BAD_REQUEST).json({
        flag: "FAIL",
        msg: "Api Field(s) Errors",
      });
    }

    const orderDetails=await db("orders as o")
    .select(
      "o.order_id",
      "o.date",
      "o.variant_id",
      "o.quantity",
      "o.resell_price",
      "o.retail_price",
      "p.category_id",
      "p.name as product_name",
      "p.img_location",
      "oi.name as customer_name",
      "oi.number",
      "oi.district",
      "oi.city",
      "oi.total",
      "oi.street",
      "oi.delivery_charge",
      "oi.status",
      "oi.advance",
      "oi.discount",
      "oi.remarks",
      "oi.paid",
      "oi.cancelled",
      "oi.cancel_details",
      "oi.cancellation_charged",
      "oi.shipped",
      "oi.printed",
       "oi.stock_updated",
       "oi.updated_at",
       "oi.updated_by",
       "pv.variant_type",
       "pv.variant",
    ).join("order_info as oi","o.order_id","oi.id")
    .join("products as p","o.product_id","p.id")
    .join("product_variants as pv","o.variant_id","pv.id")
    .where("o.order_id",orderId)

    res.status(statusCode.OK).json(orderDetails)
  }
  catch(error){
    catchBlockCodes(res,error)
  }
}


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
        db.raw(`
          CASE 
            WHEN order_info.status < 0 THEN "Cancel"
            WHEN order_info.status = 0 THEN "Pending"
            WHEN order_info.status = 1 THEN "Approved"
            WHEN order_info.status = 2 THEN "Shipped"
            WHEN order_info.status = 3 THEN "Delivered"
          END AS Status
        `),
        db.raw(`
          CASE 
            WHEN delivery_info.delivery_type = 1 THEN "In House"
            WHEN delivery_info.delivery_type = 2 THEN "Steadfast"
            ELSE "Not Selected"
          END AS Courier
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
      flag:"SUccess",
      data:orders
    });
  } catch (error) {
    catchBlockCodes(res,error)
  }
}



module.exports = { getOrders,updateOrderStatus,orderDetails,adminOrders };

