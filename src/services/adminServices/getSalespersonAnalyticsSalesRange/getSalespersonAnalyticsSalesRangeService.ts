import moment from "moment";
import DailyProductsDAO from "../../../dao/dailyProductsDAO";
import { DailyProductDocument } from "../../../schemaModels/dailyProduct.model";

export default class GetSalespersonAnalyticsSalesRangeService {
  constructor(private dailyProductsDao: DailyProductsDAO) {}

  async getAnalyticsSalesSalesperson(
    id: string,
    startDate: moment.Moment,
    endDate: moment.Moment
  ): Promise<{ [p: string]: any }> {
    const result = await this.dailyProductsDao.getSalesByDateAnalytics(
      id,
      startDate,
      endDate
    );
    const salesByDate: Map<string, any> = new Map<string, any>();
    result.forEach((dailyProduct: DailyProductDocument) => {
      const date = `${moment(dailyProduct.createdAt).year()}-${moment(
        dailyProduct.createdAt
      )
        .add(1, "month")
        .month()}-${moment(dailyProduct.createdAt).date()}`;
      if (!salesByDate.get(date)) {
        salesByDate.set(date, {
          totalIncome: 0,
          totalQuantity: 0,
          totalSales: 0,
        });
      }
      dailyProduct.dailyProducts.forEach((salesProduct: any) => {
        const { sales, quantity } = salesProduct;
        const income = sales * salesProduct.product.unitPrice;
        salesByDate.get(date).totalIncome += income;
        salesByDate.get(date).totalSales += sales;
        salesByDate.get(date).totalQuantity += quantity;
      });
    });
    const salesProductQuantity = Object.fromEntries(salesByDate);
    return salesProductQuantity;
  }
}
