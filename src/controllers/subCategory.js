const SubCategory = require("../models/subCategory");
const Category = require("../models/categories");

const addSubCategory = async (req, res) => {
  const { name, description, taxApplicability, tax } = req.body;
  const categoryId = req.body.categoryId;

  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  } else {
    req.body.imageUrl = `/uploads/${req.file.filename}`;
  }

  const category = await Category.findById(categoryId);
  if (!category) {
    return res
      .status(404)
      .json({ success: false, message: "Category not found" });
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
    return res.status(200).json({
      success: true,
      data: [newSubCategory],
      message: "Sub Category successfully created",
    });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
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
      return res.status(404).json({
        success: false,
        message: "No sub categories found",
      });
    }

    return res.status(200).json({
      success: true,
      data: [subCategories],
      message: "Sub Categories fetched successfully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// const getAllSubCategoryUnderCategory = async (req, res) => {
//   try {
//     const categoryId = req.params.id;
//     const subCategories = await SubCategory.find({ categoryId: categoryId });

//     if (!subCategories.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "No sub categories found under this category",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       data: [subCategories],
//       message: "Sub Categories fetched successfully under this category",
//     });
//   } catch (err) {
//     return res.status(400).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

// const getSubCategoryById = async (req, res) => {
//   const { id, categoryId } = req.params;

//   try {
//     const subCategory = await SubCategory.findById({
//       _id: id,
//       categoryId: categoryId,
//     });
//     if (!subCategory) {
//       return res.status(404).json({
//         success: false,
//         message: "Sub category not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       data: [subCategory],
//       message: "Sub catogory fetched successfully",
//     });
//   } catch (err) {
//     return res.status(400).json({ success: false, message: err.message });
//   }
// };

const updateSubCategory = async (req, res) => {
  const { name, image, description, taxApplicability, tax } = req.body;
  const subCategoryId = req.params.id;
  try {
    const subCategory = await SubCategory.findById(subCategoryId);
    if (!subCategory) {
      return res.status(401).json({
        status: false,
        message: "No Sub Category found!",
      });
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

    return res.status(200).json({
      status: true,
      data: [updatedSubCategory],
      message: "Sub Category updated successfully.",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  addSubCategory,
  getAllSubCategory,
  updateSubCategory,
};
