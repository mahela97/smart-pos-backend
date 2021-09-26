import moment from "moment";
import DailyProductsDAO from "../../../dao/dailyProductsDAO";
import { DailyProductDocument } from "../../../schemaModels/dailyProduct.model";
import SalesProductObjectModel from "../../../models/salesProductObjectModel";
import UserDAO from "../../../dao/userDAO";
import { UserDocument } from "../../../schemaModels/user.model";

export default class GetOneWarehouseAnalyticsService {
  constructor(
    private dailyProductsDao: DailyProductsDAO,
    private userDao: UserDAO
  ) {}

  async getOneWarehouseAnalytics(
    id: string,
    startDate: moment.Moment,
    endDate: moment.Moment
  ): Promise<Record<string, string>> {
    const result = await this.userDao.getAllSalespersons(
      { query: "", sortBy: "+firstName", page: 1, limit: 100 },
      id
    );
    const salespersons = result.items.map(
      (person: UserDocument) => <string>person._id
    );
    return this.getIncomeDaily(salespersons, startDate, endDate);
  }

  async getIncomeDaily(
    salespersons: string[],
    startDate: moment.Moment,
    endDate: moment.Moment
  ) {
    const incomesByDay: Map<string, any> = new Map<string, any>();
    await Promise.all(
      salespersons.map(async (person) => {
        const salesBySalesperson = await this.getAnalyticsSalesSalesperson(
          person,
          startDate,
          endDate
        );
        const days = Object.keys(salesBySalesperson);
        days.forEach((day) => {
          if (!incomesByDay.get(day)) {
            incomesByDay.set(day, { totalIncome: 0 });
          }
          if (salesBySalesperson[day]) {
            incomesByDay.get(day).totalIncome +=
              salesBySalesperson[day].totalIncome;
          }
        });
      })
    );
    return Object.fromEntries(incomesByDay);
  }

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
      dailyProduct.dailyProducts.forEach(
        (salesProduct: SalesProductObjectModel) => {
          const { sales, quantity } = salesProduct;
          const income = sales * salesProduct.product.unitPrice;
          salesByDate.get(date).totalIncome += income;
          salesByDate.get(date).totalSales += sales;
          salesByDate.get(date).totalQuantity += quantity;
        }
      );
    });
    const salesProductQuantity = Object.fromEntries(salesByDate);
    return salesProductQuantity;
  }
}
