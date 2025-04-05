const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const moment = require("moment-timezone");
require('dotenv').config();  


const app = express();

app.use(
  cors({
    origin: ["https://easy-drop-sepia.vercel.app/"],  
    methods: "GET,POST,PUT,DELETE", 
    credentials: true, 
  })
);

app.use(express.json());
app.use(morgan("dev"));  
moment.tz.setDefault('Asia/Dhaka');  

 



require('./app/transactions/transaction.routes')(app);
require('./app/finance/finance.routes')(app);
require('./app/vendor/vendor.routes')(app);
require('./app/orders/order.routes')(app);
require('./app/admin/admin.routes')(app);
require('./app/webiner/webiner.route')(app);


const PORT = process.env.PORT || 5000;  


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
