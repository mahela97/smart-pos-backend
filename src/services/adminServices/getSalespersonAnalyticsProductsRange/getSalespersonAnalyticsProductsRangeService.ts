import moment from "moment";
import DailyProductsDAO from "../../../dao/dailyProductsDAO";
import { DailyProductDocument } from "../../../schemaModels/dailyProduct.model";
import SalesProductObjectModel from "../../../models/salesProductObjectModel";

export default class GetSalespersonAnalyticsProductsRangeService {
  constructor(private dailyProductsDao: DailyProductsDAO) {}

  async getAnalyticsSalesSalesperson(
    id: string,
    startDate: moment.Moment,
    endDate: moment.Moment
  ): Promise<{ [p: string]: any }> {
    console.log("hh geeg");
    const result = await this.dailyProductsDao.getSalesByDateAnalytics(
      id,
      startDate,
      endDate
    );
    const salesByDate: Map<string, any> = new Map<string, any>();
    result.forEach((dailyProduct: DailyProductDocument) => {
      const date = `${moment(dailyProduct.createdAt).year()}-${moment(
        dailyProduct.createdAt
      ).month()}-${moment(dailyProduct.createdAt).date()}`;
      if (!salesByDate.get(date)) {
        salesByDate.set(date, []);
      }
      dailyProduct.dailyProducts.forEach(
        (salesProduct: SalesProductObjectModel) => {
          const { quantity, sales } = salesProduct;
          salesByDate.get(date).push({
            name: salesProduct.product.name,
            unitPrice: salesProduct.product.unitPrice,
            photo: salesProduct.product.photo,
            quantity,
            sales,
          });
        }
      );
    });
    const salesProductQuantity = Object.fromEntries(salesByDate);
    return salesProductQuantity;
  }
}
