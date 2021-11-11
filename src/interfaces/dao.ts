import { Model } from "mongoose";
import DBConnection from "../utill/database";
import { UserDocument } from "../schemaModels/user.model";

export default abstract class Dao {
  protected mongoDB = DBConnection.connect();

  protected constructor(protected model: Model<any>) {}

  async add(item: any): Promise<any> {
    // eslint-disable-next-line new-cap
    return new this.model(item).save();
  }

  async update(updateParams: any, ref: string): Promise<any> {
    return this.model.findByIdAndUpdate(ref, updateParams);
  }

  async find(
    sortBy: string,
    desc: number,
    skip: number,
    limit: number,
    filter: Record<string, unknown>
  ): Promise<any[]> {
    const items = this.model.find(filter).sort({ [sortBy]: desc });

    return limit > 0 ? items.skip(skip - 1).limit(limit) : items.skip(0);
  }

  async findOne(ref: string, pop?: string[]): Promise<any> {
    if (pop) {
      const query = this.model.findById(ref);
      pop.forEach((p) => query.populate(p));
      const res = await query.exec();
      return res;
    }
    return this.model.findById(ref);
  }

  async findIdByuid(uid: string): Promise<string> {
    const user: UserDocument = await this.model.findOne({ uid });
    return user._id;
  }

  async getDocumentByObjectId(objectId: string): Promise<any> {
    return this.model.findOne({ _id: objectId }).lean();
  }

  async delete(ref: string): Promise<any> {
    return this.model.findByIdAndDelete(ref);
  }
}
