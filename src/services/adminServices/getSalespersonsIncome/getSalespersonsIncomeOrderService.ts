import moment from "moment";
import DailyProductsDAO from "../../../dao/dailyProductsDAO";
import { DailyProductDocument } from "../../../schemaModels/dailyProduct.model";
import SalesProductObjectModel from "../../../models/salesProductObjectModel";
import { UserDocument } from "../../../schemaModels/user.model";

export default class GetSalespersonsIncomeOrderService {
  constructor(private dailyProductsDao: DailyProductsDAO) {}

  async getIncomeanalytics(
    startDate: moment.Moment,
    endDate: moment.Moment,
    order: string
  ): Promise<any[]> {
    const result = await this.dailyProductsDao.getSalespersons(
      startDate,
      endDate
    );

    const salespersons: UserDocument[] = [];
    result.forEach((s: DailyProductDocument) => {
      if (!salespersons.includes(<UserDocument>s.salesperson)) {
        salespersons.push(<UserDocument>s.salesperson);
      }
    });
    const incomes = await this.getIncomes(salespersons, startDate, endDate);
    if (order === "dsc") {
      incomes.sort(this.orderByDeccending);
    }
    if (order === "asc") {
      incomes.sort(this.orderByAccending);
    }
    return incomes;
  }

  orderByAccending(a: any, b: any) {
    if (a.income < b.income) {
      return -1;
    }
    if (a.income > b.income) {
      return 1;
    }
    return 0;
  }

  orderByDeccending(a: any, b: any) {
    if (a.income > b.income) {
      return -1;
    }
    if (a.income < b.income) {
      return 1;
    }
    return 0;
  }

  async getIncomes(
    salespersons: any[],
    startDate: moment.Moment,
    endDate: moment.Moment
  ) {
    const incomes: Map<string, any> = new Map<string, any>();
    await Promise.all(
      salespersons.map(async (salesperson) => {
        const result = await this.getAnalyticsSalesSalesperson(
          salesperson._id,
          startDate,
          endDate
        );
        if (!incomes.get(salesperson._id)) {
          incomes.set(salesperson._id, { ...salesperson, income: 0 });
        }

        // eslint-disable-next-line array-callback-return
        Object.values(result).map((income) => {
          incomes.get(salesperson._id).income += income.totalIncome;
        });
      })
    );
    return Object.values(Object.fromEntries(incomes));
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
