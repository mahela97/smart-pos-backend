import UserDAO from "../../../dao/userDAO";
import { UserDocument } from "../../../schemaModels/user.model";

export default class GetOneSalespersonService {
  constructor(protected userDao: UserDAO) {}

  async getOneSalesperson(id: string): Promise<UserDocument> {
    const result = await this.userDao.getOneSalesperson(id);
    return result;
  }
}
