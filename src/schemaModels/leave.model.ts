import * as mongoose from "mongoose";
import { Document } from "mongoose";
import DBUtil from "../utill/dBUtil";
import LeaveModel from "../models/leaveModel";

export interface LeaveDocument extends LeaveModel, Document {}

const leaveSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: DBUtil.USER,
    },
    description: {
      type: String,
    },
    approved: {
      type: Boolean,
    },
    from: {
      type: Date,
    },
    to: {
      type: Date,
    },
    archived: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<LeaveDocument>(DBUtil.LEAVE, leaveSchema);
