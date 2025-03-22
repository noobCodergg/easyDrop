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
       "oi.updated_by"
    ).join("order_info as oi","o.order_id","oi.id")
    .join("products as p","o.product_id","p.id")
    .where("o.order_id",orderId)

    res.status(statusCode.OK).json(orderDetails)
  }
  catch(error){
    catchBlockCodes(res,error)
  }
}

module.exports = { getOrders,updateOrderStatus,orderDetails };

