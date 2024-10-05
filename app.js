const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectDB = require("./config/db");
const properyRouter = require("./routes/property.route");
const userRouter = require("./routes/user.route");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://airbnb-mern-backend.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server is working");
});

// db connection
connectDB();

// api endpoints
app.use("/api/property", properyRouter);
app.use("/api/user", userRouter);

// route not found
app.use((req, res, next) => {
  res.send("no route found");
});

// server error
app.use((err, req, res, next) => {
  res.send("internal server error");
  console.log(err.message);
});

module.exports = app;
