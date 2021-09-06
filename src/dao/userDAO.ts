import UserModel from "../models/userModel";
import User, { UserDocument } from "../schemaModels/user.model";
import Dao from "../interfaces/dao";

export default class UserDAO extends Dao {
  constructor() {
    super(User);
  }

  public async add(userData: UserModel): Promise<UserDocument> {
    return super.add(userData);
  }

  public async addUser(
    userData: UserModel,
    session: any
  ): Promise<UserDocument> {
    return new this.model(userData).save(session);
  }

  public async getUser(
    uid: string | undefined,
    tenantId: string | undefined
  ): Promise<UserModel> {
    const user = await this.model.findOne({ uid, tenantId });
    return user;
  }

}
