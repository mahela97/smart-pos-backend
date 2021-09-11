import UserDAO from "../../../dao/userDAO";

export default class GetAllManagerService {
  constructor(protected userDao: UserDAO) {}

  async getAllManagers(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    const result = await this.userDao.getAllManagers(data);
    return result;
  }
}
