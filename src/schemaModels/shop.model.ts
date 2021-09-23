import * as mongoose from "mongoose";
import { Document } from "mongoose";
import DBUtil from "../utill/dBUtil";
import ShopModel from "../models/shopModel";
import * as Mongoose from "mongoose";

export interface ShopDocument extends ShopModel, Document {}

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
  },
  telephone: {
    type: String,
  },
  location: {
    type: String,
    trim: true,
  },
  longitude: {
    type: String,
  },
  latitude: {
    type: String,
  },
  ownerName: {
    type: String,
  },
  address: {
    type: String,
  },
  balance: {
    type: Number,
    default: 0,
  },
  warehouse: {
    type: Mongoose.Schema.Types.ObjectId,
    trim: true,
    ref: DBUtil.WAREHOUSE,
  },
  archived: {
    type: Boolean,
    default: false,
    index: true,
  },
});

export default mongoose.model<ShopDocument>(DBUtil.SHOP, shopSchema);
