const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected!");
  } catch (err) {
    console.error("Error connectin to MongoDB:", err.message);
    process.exit(1);
  }
};

module.exports = dbConnection;
