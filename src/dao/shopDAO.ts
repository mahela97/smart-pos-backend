import Shop from "../schemaModels/shop.model";
import Dao from "../interfaces/dao";
import QueryHelper from "../utill/QueryHelper";

export default class ShopDAO extends Dao {
  constructor() {
    super(Shop);
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
    return queryHelper.generate(Shop);
  }
}
