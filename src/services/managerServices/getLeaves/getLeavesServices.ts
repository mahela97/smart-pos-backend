import LeaveDAO from "../../../dao/leaveDAO";
import UserDAO from "../../../dao/userDAO";

export default class GetLeavesService {
  constructor(protected leaveDAO: LeaveDAO, protected userDao: UserDAO) {}

  async getLeaves(data: Record<string, any>, uid: any): Promise<Record<string, any>> {
    const user =  await this.userDao.getUserByUid(uid);
    const result = await this.leaveDAO.getAll(data, user.warehouseId);
    return result;
  }
}
