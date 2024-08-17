const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    taxApplicability: {
      type: Boolean,
      required: function () {
        return this.taxApplicability;
      },
    },
    tax: {
      type: Number,
      required: function () {
        return this.taxApplicability;
      },
    },
    baseAmount: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
      default: function () {
        return this.baseAmount - this.discount;
      },
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: false,
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Items", itemSchema);

module.exports = Item;
