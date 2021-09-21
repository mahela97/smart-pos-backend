import DailyProductsDAO from "../../../dao/dailyProductsDAO";

export default class GetSalespersonAnalyticsService {
  constructor(private dailyProductsDao: DailyProductsDAO) {}

  async getAnalyticsSalesperson(
    id: string,
    dates: Record<string, Date>
  ): Promise<void> {
    // const result = await this.dailyProductsDao.find({ id, dates });
    console.log(id, dates, this.dailyProductsDao);
  }
}
