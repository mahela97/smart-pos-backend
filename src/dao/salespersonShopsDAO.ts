import SalespersonShop, {
  SalespersonShopDocument,
} from "../schemaModels/salespersonShop.model";
import Dao from "../interfaces/dao";

export default class SalespersonShopsDAO extends Dao {
  constructor() {
    super(SalespersonShop);
  }

  public async getOneSalespersonShops(
    id: string
  ): Promise<SalespersonShopDocument> {
    return this.model
      .findOne({
        salespersonId: id,
      })
      .populate("shops");
  }

  public async deleteShopsOfSalesperson(id: string): Promise<void> {
    await this.model.findOneAndDelete({ salespersonId: id });
  }
}
