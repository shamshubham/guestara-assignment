const mongoose = require("mongoose");

const dbConnection = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB Connected Successfully!");
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB:", err);
    });
};

module.exports = dbConnection;
