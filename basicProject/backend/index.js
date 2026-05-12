import express from "express";
import "dotenv/config";
import { connectToDB } from "./config/db.js";
import { Schema, model } from "mongoose";

const app = express();
app.use(express.json());
const PORT = process.env.PORT;

await connectToDB();

//MODEL
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 10,
  },
  originalPrice: {
    type: Number,
    required: true,
    match: [/[0-9]{1,300000}/, "Values should be in range 1-300000"],
  },
  discountedPrice: {
    type: Number,
    default: 1,
    match: [/[0-9]{1,300000}/, "Values should be in range 1-300000"],
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  }, //could also be enum
});

const Product = model("product", productSchema);

//API

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

app.listen(PORT, () => console.log("Server started at port " + PORT));
