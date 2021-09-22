import Order, { OrderDocument } from "../schemaModels/order.model";
import Dao from "../interfaces/dao";
import QueryHelper from "../utill/QueryHelper";

export default class OrderDAO extends Dao {
  constructor() {
    super(Order);
  }

  public async getAll(
    filterData: Record<string, any>
  ): Promise<Record<string, any>> {
    const queryHelper = new QueryHelper(
      filterData.query,
      ["shop"],
      ["products", "shop"],
      filterData.sortBy,
      filterData.filter,
      filterData.page,
      filterData.limit
    );
    return queryHelper.generate(Order);
  }

  public async getAllOrdersOfOneSalesperson(
    filterData: Record<string, any>,
    id: string
  ): Promise<OrderDocument[]> {
    const result = await this.model
      .find({ salesperson: id, archived: false })
      .lean();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return result;

    // const queryHelper = new QueryHelper(
    //   filterData.query,
    //   [""],
    //   [""],
    //   filterData.sortBy,
    //   `salesperson eq ${id}`,
    //   filterData.page,
    //   filterData.limit
    // );
    //
    // return queryHelper.generate(Order);
  }

  public async getOrdersOfOneShop(id: string): Promise<OrderDocument[]> {
    return this.model.find({ shop: id, archived: false });
  }
}
