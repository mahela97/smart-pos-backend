import mongodb = require("mongodb");
import Leave from "../schemaModels/leave.model";
import Dao from "../interfaces/dao";
import QueryHelper from "../utill/QueryHelper";
import LeaveModel from "../models/leaveModel";

const { ObjectID } = mongodb;

export default class LeaveDAO extends Dao {
  constructor() {
    super(Leave);
  }

  public async getAll(
    filterData: Record<string, any>
  ): Promise<Record<string, any>> {
    const queryHelper = new QueryHelper(
      filterData.query,
      ["approved"],
      ["userId"],
      filterData.sortBy,
      filterData.filter,
      filterData.page,
      filterData.limit
    );

    return queryHelper.generate(Leave);
  }

  public async getAllFromOneSalesPerson(
    filterData: Record<string, any>,
    id: string
  ): Promise<Record<string, any>> {
    const queryHelper = new QueryHelper(
      filterData.query,
      ["approved"],
      [""],
      filterData.sortBy,
      `userId eq ${id}`,
      filterData.page,
      filterData.limit
    );

    return queryHelper.generate(Leave);
  }

  public async updateLeave(
    leaveId: string,
    leaveDetails: Partial<LeaveModel>
  ): Promise<void> {
    await this.model.findByIdAndUpdate(new ObjectID(leaveId), leaveDetails);
  }

  public async deleteLeave(leaveId: string): Promise<void> {
    await this.model.findByIdAndUpdate(new ObjectID(leaveId), {
      archived: true,
    });
  }
}
