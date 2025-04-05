const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const moment = require("moment-timezone");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: ["http://127.0.0.1:5173", "https://easydrop-3.onrender.com"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));
moment.tz.setDefault("Asia/Dhaka");

// ✅ Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    time: moment().format(), // current time in Asia/Dhaka
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
