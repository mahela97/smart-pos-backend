import LeaveModel from "../../../models/leaveModel";
import LeaveDAO from "../../../dao/leaveDAO";

export default class UpdateLeaveService {
  constructor(protected leaveDao: LeaveDAO) {}

  async updateLeave(
    leaveId: string,
    leaveState: Partial<LeaveModel>
  ): Promise<void> {
    await this.leaveDao.updateLeave(leaveId, leaveState);
  }
}
