import LeaveDAO from "../../../dao/leaveDAO";

export default class GetAllLeavesService {
  constructor(protected leaveDAO: LeaveDAO) {}

  async getAllLeaves(data: Record<string, any>): Promise<Record<string, any>> {
    const result = await this.leaveDAO.getAll(data);
    return result;
  }
}