const express = require("express");
const app = express();
const dbConnection = require("./config/dbConfig");
require("dotenv").config();
const categoryRoutes = require("./routes/category");
const subCategoryRoutes = require("./routes/subCategory");
const itemRoutes = require("./routes/items");

// MongoDB Connection
dbConnection();

// Middlware to parse json bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routers
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/subcategory", subCategoryRoutes);
app.use("/api/v1/item", itemRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server start at: ${PORT}`);
});
