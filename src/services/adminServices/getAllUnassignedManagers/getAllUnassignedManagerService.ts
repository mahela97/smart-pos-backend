import UserDAO from "../../../dao/userDAO";
import { UserDocument } from "../../../schemaModels/user.model";

export default class GetAllUnassignedManagerService {
  constructor(protected userDao: UserDAO) {}

  async getAllUnassignedManagers(): Promise<UserDocument[]> {
    return this.userDao.getAllUnassignedManagers();
  }
}
