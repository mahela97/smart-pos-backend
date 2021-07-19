import  { Document } from "mongoose";
import DBUtil from "../utill/dBUtil";
import UserModel from "../models/userModel";
import * as mongoose from "mongoose";

export interface UserDocument extends UserModel, Document {}

const userSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
      trim: true,
    },
    tenantId: {
      type: String,
      required: true,
      trim: true,
    },
    roles: {
      type: Array,
      required: true,
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
    },
    tp: {
      type: String,
      trim: true,
    },
    postalCode: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    district: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
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
  { timestamps: true }
);

export default mongoose.model<UserDocument>(DBUtil.USER, userSchema);
