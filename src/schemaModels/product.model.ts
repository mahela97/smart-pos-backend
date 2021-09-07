import * as mongoose from "mongoose";
import {Document} from "mongoose";
import DBUtil from "../utill/dBUtil";
import productModel from "../models/productModel";

export interface ProductDocument extends productModel, Document{
}

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            unique:true,
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            trim: true,
            ref: DBUtil.CATEGORIES
        },
        unitPrice: {
            type: Number,
        },
        description: {
            type: String,
            trim: true,
        },
        archived: {
            type: Boolean,
            default: false,
            index: true,
        },
        photo:{
            type:String
        }
    }
);


export default mongoose.model<ProductDocument>(DBUtil.PRODUCT, productSchema);