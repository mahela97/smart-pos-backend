import UserDAO from "../../../dao/userDAO";

export default class GetAllSalespersonsServiceAdmin {
  constructor(protected userDao: UserDAO) {}

  async getAllSalespersons(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    const result = await this.userDao.getAllSalespersons(data);
    return result;
  }
}
