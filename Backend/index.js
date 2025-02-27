const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const moment = require("moment-timezone")

const app = express();

app.use(
  cors({
    origin: 'http://127.0.0.1:5173',
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));
moment.tz.setDefault('Asia/Dhaka')

require('./Admin/Announcement/AnnouncementRoute')(app)
require('./Accounts/Transactions/transactionRoutes')(app)

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

