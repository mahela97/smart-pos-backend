import DailyProductsDAO from "../../../dao/dailyProductsDAO";
import DailyProductModel from "../../../models/dailyProductModel";

export default class AddDailyProductsService {
  constructor(protected dailyProductDAO: DailyProductsDAO) {}

  async addDailyProducts(data: DailyProductModel): Promise<string> {
    const result = await this.dailyProductDAO.add(data);
    return result._id;
  }
}

