import * as mongoose from "mongoose";
import { Document } from "mongoose";
import DBUtil from "../utill/dBUtil";
import ProductModel from "../models/productModel";

export interface ProductDocument extends ProductModel, Document {}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    trim: true,
    ref: DBUtil.CATEGORIES,
  },
  unitPrice: {
    type: Number,
  },
  description: {
    type: String,
    trim: true,
  },
  photo: {
    type: String,
  },
  archived: {
    type: Boolean,
    default: false,
    index: true,
  },
});

export default mongoose.model<ProductDocument>(DBUtil.PRODUCT, productSchema);
