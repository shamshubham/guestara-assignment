const Category = require("../models/categories");
const path = require("path");
const {
  sendSuccessResponse,
  sendErrorResponse,
  sendNotFoundResponse,
} = require("../utils/responseHandler");

const addCategory = async (req, res) => {
  try {
    if (!req.file) {
      return sendNotFoundResponse(res, "No file uploaded");
    }

    const { name, image, description, taxApplicability, tax, taxType } =
      req.body;
    const imageUrl = `/uploads/${req.file.filename}`;

    if (taxApplicability === "true" && !tax) {
      return sendNotFoundResponse(res, "Please provide tax");
    }

    const category = new Category({
      name,
      image: imageUrl,
      description,
      taxApplicability: taxApplicability === "true",
      tax: parseFloat(tax || 0),
      taxType,
    });

    const newCategory = await category.save();
    return sendSuccessResponse(
      res,
      newCategory,
      "Category successfully created"
    );
  } catch (err) {
    return sendErrorResponse(res, err.message, err);
  }
};

const getAllCategories = async (req, res) => {
  try {
    const filters = {};
    const { id } = req.query;
    if (id) filters._id = id;

    const categories = await Category.find(filters);
    if (categories.length === 0) {
      return sendNotFoundResponse(res, "No Categories found!");
    }

    return sendSuccessResponse(
      res,
      categories,
      "Categories fetched successfully"
    );
  } catch (err) {
    return sendErrorResponse(res, err.message, err);
  }
};

const updateCategoy = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, image, description, taxApplicability, tax, taxType } =
      req.body;
    const category = await Category.findById(id);
    if (!category) {
      return sendNotFoundResponse(res, "Category not found!");
    }

    if (req.file) {
      req.body.imageUrl = `/uploads/${req.file.filename}`;
    }

    category.name = name || category.name;
    category.image = req.body.imageUrl || category.image;
    category.description = description || category.description;
    category.taxApplicability = taxApplicability || category.taxApplicability;
    category.tax = tax || category.tax;
    category.taxType = taxType || category.taxType;

    const updatedCategory = await category.save();

    return sendSuccessResponse(
      res,
      [updatedCategory],
      "Category updated successfully"
    );
  } catch (err) {
    return sendErrorResponse(res, err.message, err);
  }
};

module.exports = {
  addCategory,
  getAllCategories,
  updateCategoy,
};
