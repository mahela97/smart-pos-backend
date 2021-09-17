import Category from "../schemaModels/category.model";
import Dao from "../interfaces/dao";
import QueryHelper from "../utill/QueryHelper";

export default class CategoryDAO extends Dao {
  constructor() {
    super(Category);
  }

  public async getAll(
    filterData: Record<string, any>
  ): Promise<Record<string, any>> {
    const queryHelper = new QueryHelper(
      filterData.query,
      ["name"],
      [],
      filterData.sortBy,
      filterData.filter,
      filterData.page,
      filterData.limit
    );

    return queryHelper.generate(Category);
  }
}
