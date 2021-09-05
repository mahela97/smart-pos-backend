import * as mongoose from "mongoose";
import {Document} from "mongoose";
import DBUtil from "../utill/dBUtil";
import CategoryModel from "../models/categoryModel";

export interface CategoryDocument extends CategoryModel, Document {
}

const categorySchema = new mongoose.Schema(
    {
        cid: {
            type: String,
            trim: true,
        },
        name: {
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

export default mongoose.model<CategoryDocument>(DBUtil.CATEGORY, categorySchema);
