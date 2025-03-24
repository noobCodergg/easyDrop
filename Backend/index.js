const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const moment = require("moment-timezone")
const {controllerProfile}=require('./app/helpers/controllerProfile')
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));
moment.tz.setDefault('Asia/Dhaka')

controllerProfile();

require('./app/catagory/category.routes')(app)
require('./app/transactions/transaction.routes')(app)
require('./app/finance/finance.routes')(app)
require('./app/vendor/vendor.routes')(app)
require('./app/orders/order.routes')(app)
require('./app/admin/admin.routes')(app)


const PORT = 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});

