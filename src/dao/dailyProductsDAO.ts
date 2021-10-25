import moment from "moment";
import Dao from "../interfaces/dao";
import DailyProduct, {
  DailyProductDocument,
} from "../schemaModels/dailyProduct.model";
import SalesProductObjectModel from "../models/salesProductObjectModel";
import UserModel from "../models/userModel";

export default class DailyProductsDAO extends Dao {
  constructor() {
    super(DailyProduct);
  }

  public async updateDailyProducts(id: string, data: any) {
    console.log(id, data);
    await this.model.findByIdAndUpdate(id, { dailyProducts: data });
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

  public async getWarehouseSalespersons(
    id: string,
    start: moment.Moment,
    end: moment.Moment
  ): Promise<DailyProductDocument[]> {
    return (
      this.model
        .find({ createdAt: { $gte: start, $lt: end } })
        .select("salesperson")
        .populate({ path: "salesperson", match: { warehouseId: id } })
        .lean()
    );
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
      .select(["createdAt", "dailyProducts"])
      .sort("createdAt");
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
      .select(["createdAt", "dailyProducts"])
      .sort("createdAt");
    return result;
  }

  public async getDailyProductsOfOneSalesperson(
    id: string
  ): Promise<DailyProductDocument> {
    const startDate = moment().startOf("day");
    const endTime = moment().endOf("day");
    return this.model
      .findOne({
        salesperson: id,
        archived: false,
        createdAt: { $gte: startDate, $lt: endTime },
      })
      .populate("dailyProducts.product")
      .sort("createdAt");
  }

  public async getAllDailyProducts(
    id: string | UserModel,
    start: moment.Moment,
    end: moment.Moment
  ): Promise<Partial<DailyProductDocument>> {
    const result = await this.model
      .findOne({
        salesperson: id,
        createdAt: { $gte: start, $lt: end },
      })
      .populate("dailyProducts.product")
      .select("dailyProducts");
    return result;
  }

  public async updateDailyProductsQuantity(
    id: string | UserModel,
    dailyProducts: SalesProductObjectModel[],
    start: moment.Moment,
    end: moment.Moment
  ): Promise<string> {
    const result = await this.model.findOneAndUpdate(
      {
        salesperson: id,
        createdAt: { $gte: start, $lt: end },
      },
      {
        dailyProducts,
      }
    );
    return result._id;
  }
}
