const express = require("express");
const cors = require("cors");
const morgan = require("morgan");


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


require('./Admin/Announcement/AnnouncementRoute')(app)

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
