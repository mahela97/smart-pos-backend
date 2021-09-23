import moment from "moment";
import DailyProductsDAO from "../../../dao/dailyProductsDAO";
import DailyProductModel from "../../../models/dailyProductModel";

export default class AddDailyProductsService {
  constructor(protected dailyProductDAO: DailyProductsDAO) {}

  async addDailyProducts(id: string, data: DailyProductModel): Promise<string> {
    const { createdAt } = data;
    const startDate = moment(createdAt).subtract(1, "day").startOf("day");
    const endDate = moment(createdAt).subtract(1, "day").endOf("day");
    const result1 = await this.dailyProductDAO.getAllDailyProducts(
      id,
      startDate,
      endDate
    );
    if (result1) {
      const { dailyProducts } = data;
      await this.dailyProductDAO.updateDailyProducts(
        id,
        dailyProducts,
        startDate,
        endDate
      );
      const result2 = await this.dailyProductDAO.getAllDailyProducts(
        id,
        startDate,
        endDate
      );
      return result2._id;
    }
    const result2 = await this.dailyProductDAO.add(data);
    return result2._id;
  }
}
