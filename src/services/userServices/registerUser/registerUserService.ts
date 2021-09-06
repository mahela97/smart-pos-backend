import UserDAO from "../../../dao/userDAO";
import UserModel from "../../../models/userModel";

export default class RegisterUserService {
  constructor(protected userDAO: UserDAO) {}

  async registerUser(data: UserModel): Promise<any> {
      const result = await this.userDAO.add(data);
      return result;

  }
}
