import LeaveDAO from "../../../dao/leaveDAO";

export default class DeleteLeaveService {
    constructor(protected leaveDAO: LeaveDAO) {}

    async deleteLeave(id: string): Promise<any> {
        const result = this.leaveDAO.deleteLeave(id);
        return result;
    }
}
