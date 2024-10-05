const mongoose = require("mongoose");

const connectDB = async () => {
  const db_uri = process.env.DB_URI;
  try {
    await mongoose.connect(db_uri);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
