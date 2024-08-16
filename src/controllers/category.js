const Category = require("../models/categories");
const path = require("path");

const addCategory = async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  } else {
    req.body.imageUrl = `/uploads/${req.file.filename}`;
  }

  // const imagePath = "uploads/" + req.file.filename;
  console.log(req.body);

  const category = new Category({
    name: req.body.name,
    image: req.body.imageUrl,
    description: req.body.description,
    taxApplicability: req.body.taxApplicability === "true",
    tax: parseFloat(req.body.tax),
    taxType: req.body.taxType,
  });
  try {
    const newCategory = await category.save();
    return res.status(201).json({
      success: true,
      data: [newCategory],
      message: "Category successfully created",
    });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});

    if (!categories) {
      return res.status(404).json({
        success: false,
        message: "No Categories found!",
      });
    }

    return res.status(200).json({
      success: true,
      data: [categories],
      message: "Categories fetched successfully",
    });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: [category],
      message: "Category fetched successfully",
    });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

const updateCategoy = async (req, res) => {
  console.log(req.params);
  const { name, image, description, taxApplicability, tax, taxType } = req.body;
  const id = req.params.id;
  console.log("Id: ", id);
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    if (req.file) {
      req.body.imageUrl = `/uploads/${req.file.filename}`;
    }

    // if (!req.file) {
    //   category.image = image;
    // }
    console.log(category);

    category.name = name || category.name;
    category.image = req.body.imageUrl || category.image;
    category.description = description || category.description;
    category.taxApplicability = taxApplicability || category.taxApplicability;
    category.tax = tax || category.tax;
    category.taxType = taxType || category.taxType;

    const updatedCategory = await category.save();

    return res.status(200).json({
      success: true,
      data: [updatedCategory],
      message: "Category updated successfully",
    });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategoy,
};
