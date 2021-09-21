import moment from "moment";
import DailyProductsDAO from "../../../dao/dailyProductsDAO";
import SalesProductObjectModel from "../../../models/salesProductObjectModel";

export default class GetSalespersonAnalyticsSalesDateService {
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
    const totalSales = { totalIncome: 0, totalQuantity: 0, totalSales: 0 };
    if (result) {
      result.dailyProducts.forEach((salesProduct: SalesProductObjectModel) => {
        const { sales, quantity } = salesProduct;
        const income = sales * salesProduct.product.unitPrice;
        totalSales.totalIncome += income;
        totalSales.totalSales += sales;
        totalSales.totalQuantity += quantity;
      });
    }
    return totalSales;
  }
}
