import LeaveDAO from "../../../dao/leaveDAO";

export default class GetLeavesService {
  constructor(protected leaveDAO: LeaveDAO) {}

  async getLeaves(data: Record<string, any>): Promise<Record<string, any>> {
    const result = await this.leaveDAO.getAll(data);
    return result;
  }
}
