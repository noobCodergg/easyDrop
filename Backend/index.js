const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const adminRoutes= require('./Admin/Announcement/AnnouncementRoute')

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));


app.use('/api/admin',adminRoutes)

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
