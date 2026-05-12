import express from "express";
import "dotenv/config";
import { connectToDB } from "./config/db.js";
import { Schema, model, Types } from "mongoose";

const app = express();
app.use(express.json());
const PORT = process.env.PORT;

await connectToDB();

//CATEGORY MODEL
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
  },
});

categorySchema.pre("save", function (next) {
  this.slug = this.name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  next();
});

const Category = model("category", categorySchema);

//PRODUCT MODEL
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 10,
  },
  originalPrice: {
    type: Number,
    required: true,
    min: [1, "Price must be at least 1"],
    max: [300000, "Price cannot exceed 300000"],
  },
  discountedPrice: {
    type: Number,
    default: 0,
    min: [0, "Discounted price must be at least 0"],
    max: [300000, "Discounted price cannot exceed 300000"],
    validate: {
      validator: function (v) {
        return v <= this.originalPrice;
      },
      message: "Discounted price cannot exceed original price",
    },
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  slug: {
    type: String,
    unique: true,
  },
  category: {
    type: Types.ObjectId,
    ref: "category",
    required: true,
  },
});

productSchema.pre("save", function (next) {
  this.slug = this.name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  next();
});

const Product = model("product", productSchema);

//API

// --- Category APIs ---

app.post("/category/add", async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json({ message: "Category added", category: newCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/category/get", async (req, res) => {
  try {
    const categories = await Category.find().select("name slug _id");
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// --- Product APIs ---

app.get("/product/get", async (req, res) => {
  try {
    const allProducts = await Product.find().populate("category", "name slug");
    res.json({ message: allProducts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/product/add", async (req, res) => {
  try {
    const productToAdd = req.body;
    const newProduct = new Product(productToAdd);
    await newProduct.save();
    res.status(201).json({ message: "Product Saved", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/product/update/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Old approach — skips pre-save hook, slug won't update on name change
    // const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    // if (!updatedProduct) {
    //   return res.status(404).json({ message: "Product not found" });
    // }
    // res.status(200).json({ message: updatedProduct });

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    Object.assign(product, req.body);
    await product.save();
    res.status(200).json({ message: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/product/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product deleted", product: deletedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => console.log("Server started at port " + PORT));
