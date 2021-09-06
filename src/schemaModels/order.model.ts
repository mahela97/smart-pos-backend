import * as mongoose from "mongoose";
import {Document} from "mongoose";
import DBUtil from "../utill/dBUtil";
import OrderModel from "../models/orderModel";


export interface OrderDocument extends OrderModel, Document {
}

const orderSchema = new mongoose.Schema(
    {

        variantId: [{
            variant: {type: mongoose.Types.ObjectId, ref: DBUtil.VARIANT}, quantity: {
                type: Number
            }
        }],
        lastName: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        role: {
            type: String,
            trim: true,
        },
        warehouseId: {
            type: mongoose.Schema.Types.ObjectId,
            trim: true,
            ref: DBUtil.WAREHOUSE
        },
        isPaid: {
            type: Boolean,
        },
        archived: {
            type: Boolean,
            default: false,
            index: true,
        },
    },
    {timestamps: true}
);

export default mongoose.model<OrderDocument>(DBUtil.ORDER, orderSchema);
