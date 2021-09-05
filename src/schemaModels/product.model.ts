import * as mongoose from "mongoose";
import {Document} from "mongoose";
import DBUtil from "../utill/dBUtil";
import ProductModel from "../models/productModel";

export interface ProductDocument extends ProductModel, Document {
}

const productSchema = new mongoose.Schema(
    {
        pid: {
            type: String,
            trim: true,
        },
        name: {
            type: String,
            trim: true,
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            trim: true,
            ref: DBUtil.CATEGORY
        },
        variantId: {
            // array
            type: mongoose.Schema.Types.ObjectId,
            trim: true,
            ref: DBUtil.WAREHOUSE
        },
        description: {
            type: String,
            trim: true,
        },
        photo: {
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

export default mongoose.model<ProductDocument>(DBUtil.PRODUCT, productSchema);
