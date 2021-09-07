import * as mongoose from "mongoose";
import {Document} from "mongoose";
import DBUtil from "../utill/dBUtil";
import ShopModel from "../models/shopModel";

export interface ShopDocument extends ShopModel, Document{
}

const shopSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        email:{
            type:String
        },
        telephone:{
            type:String
        },
        location: {
            type: String,
            trim: true,
        },
        longitude:{
            type:String
        },
        latitude:{
            type:String
        },
        ownerName:{
            type:String
        },
        address:{
            type:String
        },
        archived: {
            type: Boolean,
            default: false,
            index: true,
        },
    }
);


export default mongoose.model<ShopDocument>(DBUtil.SHOP, shopSchema);