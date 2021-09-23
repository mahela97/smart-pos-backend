import moment from "moment";
import DailyProductsDAO from "../../../dao/dailyProductsDAO";
import {DailyProductDocument} from "../../../schemaModels/dailyProduct.model";

export default class GetAllDailyProductsService {
  constructor(private dailyProductsDao: DailyProductsDAO) {}

  async getAllDailyProducts(
    id: string,
    startDate: moment.Moment,
    endDate: moment.Moment
  ): Promise<Partial<DailyProductDocument>> {
    const result = await this.dailyProductsDao.getAllDailyProducts(
      id,
      startDate,
      endDate
    );
    return result;
  }
}
