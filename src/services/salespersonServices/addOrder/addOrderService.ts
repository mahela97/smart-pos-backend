import OrderDAO from "../../../dao/orderDAO";
import OrderModel from "../../../models/orderModel";

export default class AddOrderService {
  constructor(protected orderDAO: OrderDAO) {}

  async addOrder(data: OrderModel): Promise<string> {
    const result = await this.orderDAO.add(data);
    return result._id;
  }
}
