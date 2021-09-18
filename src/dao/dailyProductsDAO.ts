import Dao from "../interfaces/dao";
import DailyProduct, {
  DailyProductDocument,
} from "../schemaModels/dailyProduct.model";

export default class DailyProductsDAO extends Dao {
  constructor() {
    super(DailyProduct);
  }

  public async getDailyProductsOfOneSalesperson(
    id: string
  ): Promise<DailyProductDocument[]> {
    return this.model
      .find({ salesperson: id, archived: false })
      .populate("dailyProducts.product");
  }
}
