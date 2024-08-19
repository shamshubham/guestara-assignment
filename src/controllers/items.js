const Item = require("../models/items");
const Category = require("../models/categories");
const SubCategory = require("../models/subCategory");
const {
  sendSuccessResponse,
  sendErrorResponse,
  sendNotFoundResponse,
} = require("../utils/responseHandler");

const addItem = async (req, res) => {
  try {
    const {
      name,
      description,
      taxApplicability,
      tax,
      baseAmount,
      discount,
      categoryId,
      subCategoryId,
    } = req.body;

    let { totalAmount } = req.body;

    if (!req.file) {
      return sendNotFoundResponse(res, "No file uploaded!");
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    console.log(imageUrl);

    const category = await Category.findById(categoryId);
    if (!category) {
      return sendNotFoundResponse(res, "No Category Found!");
    }

    if (subCategoryId) {
      const subCategory = await SubCategory.findById(subCategoryId);
      if (!subCategory) {
        return sendErrorResponse(res, "No Sub Category found!");
      }
    }

    if (!totalAmount) {
      totalAmount = baseAmount - discount;
    }

    const item = new Item({
      name,
      image: imageUrl,
      description,
      taxApplicability,
      tax,
      baseAmount,
      discount,
      totalAmount,
      categoryId,
      subCategoryId,
    });
    const newItem = await item.save();
    return sendSuccessResponse(res, newItem, "Item created successfully");
  } catch (err) {
    return sendErrorResponse(res, err.message, err);
  }
};

const getAllItem = async (req, res) => {
  try {
    const { categoryId, subCategoryId, id, itemName } = req.query;
    let filters = {};

    if (categoryId) filters.categoryId = categoryId;
    if (subCategoryId) filters.subCategoryId = subCategoryId;
    if (id) filters._id = id;
    if (itemName) filters.name = { $regex: itemName, $options: "i" };

    const items = await Item.find(filters);

    if (items.length === 0) {
      return sendNotFoundResponse(res, "No items found!");
    }
    return sendSuccessResponse(res, [items], "Items fetched successfully");
  } catch (err) {
    return sendErrorResponse(res, err.message, err);
  }
};

const updateItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const {
      name,
      image,
      description,
      taxApplicability,
      tax,
      baseAmount,
      discount,
      totalAmount,
    } = req.body;

    const item = await Item.findById(itemId);
    if (!item) {
      return sendNotFoundResponse(err, "No items found!");
    }

    if (req.file) {
      req.body.imageUrl = `/uploads/${req.file.filename}`;
    }

    item.name = name || item.name;
    item.image = req.body.imageUrl || item.image;
    item.description = description || item.description;
    item.taxApplicability = taxApplicability || item.taxApplicability;
    item.tax = tax || item.tax;
    item.baseAmount = baseAmount || item.baseAmount;
    item.discount = discount || item.discount;
    item.totalAmount = totalAmount || item.totalAmount;

    const updatedItem = await item.save();
    return sendSuccessResponse(res, [updatedItem], "Item updated successfully");
  } catch (err) {
    return sendErrorResponse(res, err.message, err);
  }
};

module.exports = { addItem, getAllItem, updateItem };
