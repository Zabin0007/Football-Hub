const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("DB connection error:", err);
  }
};

module.exports = connectDB;