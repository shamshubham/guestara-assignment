const Item = require("../models/items");
const Category = require("../models/categories");
const SubCategory = require("../models/subCategory");

const addItem = async (req, res) => {
  const {
    name,
    image,
    description,
    taxApplicability,
    tax,
    baseAmount,
    discount,
    totalAmount,
    categoryId,
    subCategoryId,
  } = req.body;

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded!",
    });
  } else {
    req.body.imageUrl = `/uploads/${req.file.filename}`;
  }

  const category = await Category.findById(categoryId);
  if (!category) {
    return res.status(404).json({
      success: false,
      message: "No Category Found!",
    });
  }

  if (subCategoryId) {
    const subCategory = await SubCategory.findById(subCategoryId);
    if (!subCategory) {
      return res.status(404).json({
        success: false,
        message: "No Sub Category found!",
      });
    }
  }

  const item = new Item({
    name: name,
    image: req.body.imageUrl,
    description: description,
    taxApplicability: taxApplicability,
    tax: tax,
    baseAmount: baseAmount,
    discount: discount,
    totalAmount: totalAmount,
    categoryId: categoryId,
    subCategoryId: subCategoryId,
  });
  try {
    const newItem = await item.save();
    return res.status(200).json({
      success: true,
      data: [newItem],
      message: "Item created successfully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllItem = async (req, res) => {
  const { categoryId, subCategoryId, id, itemName } = req.query;

  try {
    let filters = {};
    if (categoryId) filters.categoryId = categoryId;
    if (subCategoryId) filters.subCategoryId = subCategoryId;
    if (id) filters._id = id;
    if (itemName) filters.name = { $regex: itemName, $options: "i" };

    const items = await Item.find(filters);

    if (items.length === 0) {
      return res.status(401).json({
        success: false,
        message: "No items found!",
      });
    }
    return res.status(200).json({
      success: true,
      data: [items],
      message: "Items fetched successfully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const updateItem = async (req, res) => {
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

  try {
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(401).json({
        success: false,
        message: "No items found!",
      });
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
    return res.status(200).json({
      success: true,
      data: [updatedItem],
      message: "Item updated successfully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { addItem, getAllItem, updateItem };
