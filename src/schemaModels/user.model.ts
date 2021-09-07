import * as mongoose from "mongoose";
import {Document} from "mongoose";
import DBUtil from "../utill/dBUtil";
import UserModel from "../models/userModel";

export interface UserDocument extends UserModel, Document {
}

const userSchema = new mongoose.Schema(
    {
        uid: {
            type: String,
            trim: true,
        },
        firstName: {
            type: String,
            trim: true,
        },
        lastName: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique:true
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
        profileImage: {
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

export default mongoose.model<UserDocument>(DBUtil.USER, userSchema);
