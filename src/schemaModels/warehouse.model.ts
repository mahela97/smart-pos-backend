import * as mongoose from "mongoose";
import {Document} from "mongoose";
import DBUtil from "../utill/dBUtil";
import WarehouseModel from "../models/warehouseModel";


export interface WarehouseDocument extends WarehouseModel, Document{
}

const wareHouseSchema = new mongoose.Schema(
    {
        wid: {
            type: String,
            trim: true,
        },
        location: {
            type: String,
            trim: true,
        },
        telephone: {
            type: String,
            trim: true
        },
        name: {
            type: String,
            trim: true
        },
        salesPersonId: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: DBUtil.USER
        },
        products: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: DBUtil.PRODUCT,
        },
        managerId: {
            type: mongoose.Schema.Types.ObjectId,
            trim: true,
            ref: DBUtil.USER
        },
        archived: {
            type: Boolean,
            default: false,
            index: true,
        }
    }
);


export default mangoose.model<WarehouseDocument>(DBUtil.WAREHOUSE, wareHouseSchema);