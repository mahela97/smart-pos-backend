import LeaveDAO from "../../../dao/leaveDAO";
import LeaveModel from "../../../models/leaveModel";

export default class AddLeaveService {
    constructor(protected leaveDAO: LeaveDAO) {}

    async addLeave(data: LeaveModel): Promise<string> {
        const result = await this.leaveDAO.add(data);
        return result._id;
    }
}

