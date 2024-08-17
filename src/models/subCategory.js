const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
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
      required: false,
    },
    tax: {
      type: Number,
      required: false,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

module.exports = SubCategory;
