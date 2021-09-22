import moment from "moment";
import Dao from "../interfaces/dao";
import DailyProduct, {
  DailyProductDocument,
} from "../schemaModels/dailyProduct.model";

export default class DailyProductsDAO extends Dao {
  constructor() {
    super(DailyProduct);
  }

  public async getSalespersons(
    start: moment.Moment,
    end: moment.Moment
  ): Promise<DailyProductDocument[]> {
    return this.model
      .find({ createdAt: { $gte: start, $lt: end } })
      .select("salesperson")
      .populate("salesperson")
      .lean();
  }

  public async getSalesByDateAnalytics(
    id: string,
    start: moment.Moment,
    end: moment.Moment
  ): Promise<DailyProductDocument[]> {
    const result = await this.model
      .find({
        salesperson: id,
        createdAt: { $gte: start, $lt: end },
      })
      .populate("dailyProducts.product")
      .select(["createdAt", "dailyProducts"]);
    return result;
  }

  public async getSalesByDateAnalyticsDate(
    id: string,
    start: moment.Moment,
    end: moment.Moment
  ): Promise<DailyProductDocument> {
    const result = await this.model
      .findOne({
        salesperson: id,
        createdAt: { $gte: start, $lt: end },
      })
      .populate("dailyProducts.product")
      .select(["createdAt", "dailyProducts"]);
    return result;
  }

  public async getDailyProductsOfOneSalesperson(
    id: string
  ): Promise<DailyProductDocument[]> {
    const startDate = moment().startOf("day");
    const endTime = moment().endOf("day");
    return this.model
      .find({
        salesperson: id,
        archived: false,
        createdAt: { $gte: startDate, $lt: endTime },
      })
      .populate("dailyProducts.product");
  }
}
