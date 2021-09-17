import Leave from "../schemaModels/leave.model";
import Dao from "../interfaces/dao";
import QueryHelper from "../utill/QueryHelper";

export default class LeaveDAO extends Dao {
  constructor() {
    super(Leave);
  }

  public async getAll(
    filterData: Record<string, any>
  ): Promise<Record<string, any>> {
    const queryHelper = new QueryHelper(
      filterData.query,
      ["description"],
      ["userId"],
      filterData.sortBy,
      filterData.filter,
      filterData.page,
      filterData.limit
    );

    return queryHelper.generate(Leave);
  }
}