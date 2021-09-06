import * as mongoose from "mongoose";
import {Document} from "mongoose";
import DBUtil from "../utill/dBUtil";
import DailyProductModel from "../models/dailyProductModel";

export interface DailyProductDocument extends DailyProductModel, Document{
}

const dailyProductSchema = new mongoose.Schema(
    {
        dailyProducts: [{
            variant: {type: mongoose.Types.ObjectId, ref: DBUtil.VARIANT}, quantity: {
                type: Number
            }
        }],
        salespersonId:{
            type:mongoose.Types.ObjectId,
            ref:DBUtil.DAILYPRODUCT
        },
        archived: {
            type: Boolean,
            default: false,
            index: true,
        },
    },{timestamps:true}
);


export default mongoose.model<DailyProductDocument>(DBUtil.DAILYPRODUCT, dailyProductSchema);