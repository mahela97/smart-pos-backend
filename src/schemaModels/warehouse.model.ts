import * as mongoose from "mongoose";
import { Document } from "mongoose";
import DBUtil from "../utill/dBUtil";
import WarehouseModel from "../models/warehouseModel";

export interface WarehouseDocument extends WarehouseModel, Document {}

const wareHouseSchema = new mongoose.Schema({
  telephone: {
    type: String,
    trim: true,
  },
  name: {
    type: String,
  },
  salesPersonId: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: DBUtil.USER,
  },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: DBUtil.PRODUCT },
      quantity: {
        type: Number,
      },
    },
  ],
  managerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: DBUtil.USER,
  },
  district: {
    type: String,
  },
  town: {
    type: String,
  },
  archived: {
    type: Boolean,
    default: false,
    index: true,
  },
});

export default mongoose.model<WarehouseDocument>(
  DBUtil.WAREHOUSE,
  wareHouseSchema
);
