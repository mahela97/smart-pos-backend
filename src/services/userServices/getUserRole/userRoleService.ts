import UserDAO from "../../../dao/userDAO";

export default class UserRoleService {
  constructor(protected userDao: UserDAO) {}

  async getUser(uid: string): Promise<string> {
    const role = await this.userDao.findRoleByuid(uid);
    return role;
  }
}
