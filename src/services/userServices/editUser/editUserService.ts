import UserDAO from "../../../dao/userDAO";
import UserModel from "../../../models/userModel";

export default class EditUserService {
  constructor(protected userDAO: UserDAO) {}

  async editUser(userId: string, data: UserModel): Promise<string> {
    const result = await this.userDAO.editUser(userId, data);
    return result;
  }
}
