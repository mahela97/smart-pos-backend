import UserDAO from "../../../dao/userDAO";

export default class GetAllSalespersonsService {
  constructor(protected userDao: UserDAO) {}

  async getAllSalespersons(
    id: string,
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    const result = await this.userDao.getAllSalespersons(id, data);
    return result;
  }
}
