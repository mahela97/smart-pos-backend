import UserDAO from "../../../dao/userDAO";
import { UserDocument } from "../../../schemaModels/user.model";

export default class GetCurrentUserService {
  constructor(protected userDao: UserDAO) {}

  async getUser(uid: string): Promise<UserDocument> {
    const user = await this.userDao.getUserByUid(uid);
    if (!user) {
      throw new Error("User Not Found");
    }
    return user;
  }
}
