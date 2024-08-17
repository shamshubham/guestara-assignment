const SubCategory = require("../models/subCategory");
const Category = require("../models/categories");
const {
  sendSuccessResponse,
  sendErrorResponse,
  sendNotFoundResponse,
} = require("../utils/responseHandler");

const addSubCategory = async (req, res) => {
  try {
    const { name, description, categoryId } = req.body;
    let { taxApplicability, tax } = req.body;

    if (!req.file) {
      return sendNotFoundResponse(res, "No file uploaded");
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    const category = await Category.findById(categoryId);
    if (!category) {
      return sendNotFoundResponse(res, "Category not found");
    }

    if (!taxApplicability || !tax) {
      taxApplicability = category.taxApplicability;
      tax = category.tax;
    }

    const subCategory = new SubCategory({
      name,
      image: imageUrl,
      description,
      taxApplicability,
      tax: parseFloat(tax || 0),
      categoryId,
    });

    const newSubCategory = await subCategory.save();
    return sendSuccessResponse(
      res,
      newSubCategory,
      "Sub Category successfully created"
    );
  } catch (err) {
    return sendErrorResponse(res, err.message, err);
  }
};

const getAllSubCategory = async (req, res) => {
  try {
    const { categoryId, id } = req.query;
    let filters = {};

    if (categoryId) filters.categoryId = categoryId;
    if (id) filters._id = id;

    const subCategories = await SubCategory.find(filters);

    if (subCategories.length === 0) {
      return sendNotFoundResponse(res, "No sub categories found");
    }

    return sendSuccessResponse(
      res,
      subCategories,
      "Sub Categories fetched successfully"
    );
  } catch (err) {
    return sendErrorResponse(res, err.message, err);
  }
};

const updateSubCategory = async (req, res) => {
  try {
    const { name, image, description, taxApplicability, tax } = req.body;
    const subCategoryId = req.params.id;

    const subCategory = await SubCategory.findById(subCategoryId);
    if (!subCategory) {
      return sendNotFoundResponse(res, "No Sub Category found!");
    }

    if (req.file) {
      req.body.imageUrl = `/uploads/${req.file.filename}`;
    }

    subCategory.name = name || subCategory.name;
    subCategory.image = req.body.imageUrl || subCategory.image;
    subCategory.description = description || subCategory.description;
    subCategory.taxApplicability =
      taxApplicability || subCategory.taxApplicability;
    subCategory.tax = tax || subCategory.tax;

    const updatedSubCategory = await subCategory.save();

    return sendSuccessResponse(
      res,
      [updatedSubCategory],
      "Sub Category updated successfully."
    );
  } catch (err) {
    return sendErrorResponse(res, err.message, err);
  }
};

module.exports = {
  addSubCategory,
  getAllSubCategory,
  updateSubCategory,
};
