import * as mongoose from "mongoose";
import {Document} from "mongoose";
import DBUtil from "../utill/dBUtil";
import ShopModel from "../models/shopModel";

export interface ShopDocument extends ShopModel, Document {
}

const shopSchema = new mongoose.Schema(
    {
        sid: {
            type: String,
            trim: true,
        },
        name: {
            type: String,
            trim: true,
        },
        location: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
        },
        telephone: {
            type: String,
            trim: true,
        },
        ownerName: {
            type: String,
            trim: true,
        },
        address: {
            type: String,
            trim: true,
        },
        archived: {
            type: Boolean,
            default: false,
            index: true,
        },
    },
    {timestamps: true}
);

export default mongoose.model<ShopDocument>(DBUtil.SHOP, shopSchema);
