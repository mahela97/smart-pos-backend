import LeaveDAO from "../../../dao/leaveDAO";

export default class GetAllLeavesService {
  constructor(protected leaveDAO: LeaveDAO) {}

  async getAllLeaves(
    data: Record<string, any>,
    id: string
  ): Promise<Record<string, any>> {
    const result = await this.leaveDAO.getAllFromOneSalesPerson(data, id);
    return result;
  }
}
