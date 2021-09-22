import DailyProductsDAO from "../../../dao/dailyProductsDAO";
import { DailyProductDocument } from "../../../schemaModels/dailyProduct.model";

export default class GetDailyProductsService {
  constructor(protected dailyProductDAO: DailyProductsDAO) {}

  async getDailyProductsOfOneSalesperson(
    id: string
  ): Promise<DailyProductDocument> {
    const result = await this.dailyProductDAO.getDailyProductsOfOneSalesperson(
      id
    );
    return result;
  }
}
