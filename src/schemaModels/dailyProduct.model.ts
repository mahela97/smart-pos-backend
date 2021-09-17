import * as mongoose from "mongoose";
import { Document } from "mongoose";
import DBUtil from "../utill/dBUtil";
import DailyProductModel from "../models/dailyProductModel";

export interface DailyProductDocument extends DailyProductModel, Document {}

const dailyProductSchema = new mongoose.Schema(
  {
    dailyProducts: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: DBUtil.PRODUCT },
        quantity: {
          type: Number,
        },
      },
    ],
    salesperson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: DBUtil.USER,
    },
    archived: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<DailyProductDocument>(
  DBUtil.DAILYPRODUCT,
  dailyProductSchema
);
