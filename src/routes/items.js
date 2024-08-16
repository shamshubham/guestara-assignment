const express = require("express");
const {
  addItem,
  getAllItem,
  updateItem,
  searchItemByName,
} = require("../controllers/items");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), addItem);
router.get("/", getAllItem);
router.put("/:id", upload.single("newImage"), updateItem);

module.exports = router;
