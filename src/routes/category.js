const express = require("express");
const {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategoy,
} = require("../controllers/category");
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

router.post("/", upload.single("image"), addCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.put("/:id", upload.single("newImage"), updateCategoy);

module.exports = router;
