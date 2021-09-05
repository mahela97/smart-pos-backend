import * as mongoose from "mongoose";
import {Document} from "mongoose";
import DBUtil from "../utill/dBUtil";
import VariantModel from "../models/variantModel";

export interface VariantDocument extends VariantModel, Document {
}

const variantSchema = new mongoose.Schema(
    {
        vid: {
            type: String,
            trim: true,
        },
        productId: {
            type: String,
            trim: true,
        },
        unitPrice: {
            type: Number,
            trim: true,
        },
        variantType: {
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

export default mongoose.model<VariantDocument>(DBUtil.VARIANT, variantSchema);
