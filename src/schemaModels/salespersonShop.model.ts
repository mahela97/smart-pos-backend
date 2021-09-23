import * as mongoose from "mongoose";
import { Document } from "mongoose";
import DBUtil from "../utill/dBUtil";
import SalespersonShopModel from "../models/salespersonShopModel";

export interface SalespersonShopDocument extends SalespersonShopModel, Document {}

const salespersonShopSchema = new mongoose.Schema({
    salespersonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: DBUtil.USER,
        unique: true,
    },
    shops: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: DBUtil.SHOP,
    },
    archived: {
        type: Boolean,
        default: false,
        index: true,
    },
});

export default mongoose.model<SalespersonShopDocument>(
    DBUtil.SALESPERSONSHOP,
    salespersonShopSchema
);
