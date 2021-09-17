import * as mongoose from "mongoose";
import { Document } from "mongoose";
import DBUtil from "../utill/dBUtil";
import VariantModel from "../models/variantModel";

export interface VariantDocument extends VariantModel, Document {}

const variantSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: DBUtil.PRODUCT,
    },
    unitPrice: {
      type: Number,
    },
    variant1: {
      type: String,
      required: true,
    },
    variant2: {
      type: String,
      required: true,
    },
    archived: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<VariantDocument>(DBUtil.VARIANT, variantSchema);
