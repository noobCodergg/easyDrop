const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const moment = require("moment-timezone");
require("dotenv").config();

const app = express();


app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET,POST,PUT,DELETE"],
    credentials: true,  // If you need to allow credentials (cookies, etc.)
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use(express.json());
app.use(morgan("dev"));
moment.tz.setDefault("Asia/Dhaka");


app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    time: moment().format(), 
    message: "Server is healthy",
  });
});

// Routes
require("./category/categoryroute")(app);
require("./transactions/transaction.routes")(app);
require("./finance/finance.routes")(app);
require("./vendor/vendor.routes")(app);
require("./orders/order.routes")(app);
require("./admin/admin.routes")(app);
require("./webiner/webiner.route")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
