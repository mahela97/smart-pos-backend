import UserDAO from "../../../dao/userDAO";
import { UserDocument } from "../../../schemaModels/user.model";

export default class GetOneManagerService {
  constructor(protected userDao: UserDAO) {}

  async getOneManager(id: string): Promise<UserDocument> {
    const result = await this.userDao.getOneManager(id);
    return result;
  }
}
