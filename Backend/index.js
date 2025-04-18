const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const moment = require("moment-timezone");
require("dotenv").config();

const app = express();

// Update CORS configuration: specify exact origin instead of *
app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,   
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
require("./info/info.route")(app);
require("./prize/prize.route")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
