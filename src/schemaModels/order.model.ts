import * as mongoose from "mongoose";
import { Document } from "mongoose";
import DBUtil from "../utill/dBUtil";
import OrderModel from "../models/orderModel";

export interface OrderDocument extends OrderModel, Document {}

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: DBUtil.PRODUCT,
        },
        quantity: {
          type: Number,
        },
      },
    ],
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: DBUtil.SHOP,
      required: true,
    },
    salesperson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: DBUtil.USER,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    receivedPrice: {
      type: Number,
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

export default mongoose.model<OrderDocument>(DBUtil.ORDER, orderSchema);
