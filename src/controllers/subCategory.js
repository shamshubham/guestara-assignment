const SubCategory = require("../models/subCategory");
const Category = require("../models/categories");
const {
  sendSuccessResponse,
  sendErrorResponse,
  sendNotFoundResponse,
} = require("../utils/responseHandler");

const addSubCategory = async (req, res) => {
  const { name, description, taxApplicability, tax } = req.body;
  const categoryId = req.body.categoryId;

  if (!req.file) {
    return sendNotFoundResponse(res, "No file uploaded");
    // res
    //   .status(400)
    //   .json({ success: false, message: "No file uploaded" });
  } else {
    req.body.imageUrl = `/uploads/${req.file.filename}`;
  }

  const category = await Category.findById(categoryId);
  if (!category) {
    return sendNotFoundResponse(res, "Category not found");
    // res
    //   .status(404)
    //   .json({ success: false, message: "Category not found" });
  }

  const subCategory = new SubCategory({
    name: name,
    image: req.body.imageUrl,
    description: description,
    taxApplicability: taxApplicability,
    tax: parseFloat(tax),
    categoryId: categoryId,
  });

  try {
    const newSubCategory = await subCategory.save();
    return sendSuccessResponse(
      res,
      [newSubCategory],
      "Sub Category successfully created"
    );
    // res.status(200).json({
    //   success: true,
    //   data: [newSubCategory],
    //   message: "Sub Category successfully created",
    // });
  } catch (err) {
    return sendErrorResponse(res, err.message, err);
    res.status(400).json({ success: false, message: err.message });
  }
};

const getAllSubCategory = async (req, res) => {
  try {
    const { categoryId, subCategoryId } = req.query;
    let filters = {};
    if (categoryId) filters.categoryId = categoryId;
    if (subCategoryId) filters._id = subCategoryId;
    const subCategories = await SubCategory.find(filters);
    if (subCategories.length === 0) {
      return sendNotFoundResponse(res, "No sub categories found");
      // res.status(404).json({
      //   success: false,
      //   message: "No sub categories found",
      // });
    }

    return sendSuccessResponse(
      res,
      [subCategories],
      "Sub Categories fetched successfully"
    );
    // res.status(200).json({
    //   success: true,
    //   data: [subCategories],
    //   message: "Sub Categories fetched successfully",
    // });
  } catch (err) {
    return sendErrorResponse(res, err.message, err);
    // res.status(400).json({
    //   success: false,
    //   message: err.message,
    // });
  }
};

const updateSubCategory = async (req, res) => {
  const { name, image, description, taxApplicability, tax } = req.body;
  const subCategoryId = req.params.id;
  try {
    const subCategory = await SubCategory.findById(subCategoryId);
    if (!subCategory) {
      return sendNotFoundResponse(res, "No Sub Category found!");
      // res.status(401).json({
      //   status: false,
      //   message: "No Sub Category found!",
      // });
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
    // res.status(200).json({
    //   status: true,
    //   data: [updatedSubCategory],
    //   message: "Sub Category updated successfully.",
    // });
  } catch (err) {
    return sendErrorResponse(res, err.message, err);
    // res.status(400).json({
    //   success: false,
    //   message: err.message,
    // });
  }
};

module.exports = {
  addSubCategory,
  getAllSubCategory,
  updateSubCategory,
};
