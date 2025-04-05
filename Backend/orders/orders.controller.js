const db = require('../config/db'); // Ensure the correct path to db.js

const {statusCode}=require('../helpers/httpStatusCode')
const {catchBlockCodes}=require('../helpers/catchBlockCodes');
const moment = require('moment-timezone');

const getOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const  { text, value, startDate, endDate } = req.query;

    const formatStartDate = startDate ? moment(startDate).format("YYYY-MM-DD") : null;
    const formatEndDate = endDate ? moment(endDate).format("YYYY-MM-DD") : null;

    console.log(formatStartDate,formatEndDate)

 

    let query = db("orders as o")
      .select(
        "o.order_id",
        "o.date",
        "p.name as product_name",
        "p.main_img as product_image",
        "oi.status"
      )
      .join("order_info as oi", "o.order_id", "oi.id") 
      .join("products as p", "o.product_id", "p.id") 
      .where("p.vendor_id", userId);

    if (text) {
      query = query.where("p.name", "like", `%${text}%`);
    }

    if (value) {
      query = query.where("oi.status", value);
    }

    if (startDate && endDate) {
      query = query.whereBetween("o.date", [formatStartDate, formatEndDate]);
    }

    const orders = await query;
    
    res.status(statusCode.OK).json(orders);
  } catch (err) {
    console.error("Error in getOrders:", err);
    catchBlockCodes(res, err);
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
       "pc.category",
       "o.additional_cost",
       "di.tracking_id"
    ).join("order_info as oi","o.order_id","oi.id")
    .join("products as p","o.product_id","p.id")
    .join("product_variants as pv","o.variant_id","pv.id")
    .join("product_categories as pc","p.category_id","pc.id")
    .join("delivery_info as di","o.order_id","di.order_id")
    .where("o.order_id",orderId)

    res.status(statusCode.OK).json(orderDetails)
  }
  catch(error){
    catchBlockCodes(res,error)
  }
}


const getOrdersByStatus=async(req,res)=>{
  try {
    const {userId}=req.params;
    
    const result = await db("orders")
    .join("products", "orders.product_id", "=", "products.id")
    .join("order_info", "order_info.id", "=", "orders.order_id")
    .where("products.vendor_id", userId)
    .groupBy("products.vendor_id")
    .select(
      "products.vendor_id",
      db.raw("COUNT(order_info.id) as total_orders"),
      db.raw("SUM(CASE WHEN order_info.status = -1 THEN 1 ELSE 0 END) as cancelled_count"),
      db.raw("SUM(CASE WHEN order_info.status = 0 THEN 1 ELSE 0 END) as pending_count"),
      db.raw("SUM(CASE WHEN order_info.status = 1 THEN 1 ELSE 0 END) as approved_count"),
      db.raw("SUM(CASE WHEN order_info.status = 2 THEN 1 ELSE 0 END) as shipped_count"),
      db.raw("SUM(CASE WHEN order_info.status = 3 THEN 1 ELSE 0 END) as delivered_count")
    );

    res.status(statusCode.OK).json({
      flag: "SUCCESS",
      result:result[0],
    })
  } catch (error) {
    catchBlockCodes(res,error);
  }
}
 

module.exports = { getOrders,updateOrderStatus,orderDetails,getOrdersByStatus };

