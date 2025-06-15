const mongoose = require('mongoose');
require('dotenv').config();

const DBConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected successfully (backend 8000)");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
  }
};

module.exports = { DBConnection };
