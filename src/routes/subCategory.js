const express = require("express");
const {
  addSubCategory,
  getAllSubCategory,
  getAllSubCategoryUnderCategory,
  getSubCategoryById,
  updateSubCategory,
} = require("../controllers/subCategory");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

router.post("/", upload.single("image"), addSubCategory);
router.get("/", getAllSubCategory);
router.put("/:id", upload.single("newImage"), updateSubCategory);

module.exports = router;
