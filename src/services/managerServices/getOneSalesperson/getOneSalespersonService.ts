import UserDAO from "../../../dao/userDAO";
import { UserDocument } from "../../../schemaModels/user.model";

export default class GetOneSalespersonService {
  constructor(protected userDao: UserDAO) {}

  async getOneSalesperson(id: string, uid: any): Promise<UserDocument> {
    const user =  await this.userDao.getUserByUid(uid);
    const result = await this.userDao.getOneSalesperson(id);

    if(user.warehouseId?.toString() !== result.warehouseId?.toString()){
      throw new Error('Warehouse not match');
      // return;
    }
    return result;
  }
}
