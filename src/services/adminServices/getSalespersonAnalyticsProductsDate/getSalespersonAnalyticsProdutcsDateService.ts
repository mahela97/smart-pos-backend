import moment from "moment";
import DailyProductsDAO from "../../../dao/dailyProductsDAO";
import SalesProductObjectModel from "../../../models/salesProductObjectModel";

export default class GetSalespersonAnalyticsProductsDateService {
  constructor(private dailyProductsDao: DailyProductsDAO) {}

  async getAnalyticsSalesSalesperson(
    id: string,
    startDate: moment.Moment,
    endDate: moment.Moment
  ): Promise<{ [p: string]: any }> {
    const result = await this.dailyProductsDao.getSalesByDateAnalyticsDate(
      id,
      startDate,
      endDate
    );
    const products: Record<string, string | number>[] = [];
    if (result) {
      result.dailyProducts.forEach((salesProduct: SalesProductObjectModel) => {
        const { quantity, sales } = salesProduct;
        products.push({
          name: salesProduct.product.name,
          unitPrice: salesProduct.product.unitPrice,
          photo: salesProduct.product.photo,
          quantity,
          sales,
        });
      });
    }
    return products;
  }
}
