const express = require("express");
const app = express();
const dotenv = require("dotenv");
const dbConnection = require("./config/dbConfig");
const categoryRoutes = require("./routes/category");
const subCategoryRoutes = require("./routes/subCategory");
const itemRoutes = require("./routes/items");

// Loading environment variables
dotenv.config();

// MongoDB Connection
dbConnection();

// Middlware to parse json bodies and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route handlers
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/subcategory", subCategoryRoutes);
app.use("/api/v1/item", itemRoutes);

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server start on port: ${PORT}`);
});
