import OrderDAO from "../../../dao/orderDAO";
import { OrderDocument } from "../../../schemaModels/order.model";

export default class GetAllOrdersOfOneSalespersonService {
  constructor(protected orderDAO: OrderDAO) {}

  async getAllOrdersOfOneSalesperson(
    data: Record<string, any>,
    id: string
  ): Promise<OrderDocument[]> {
    const result = await this.orderDAO.getAllOrdersOfOneSalesperson(data, id);
    return result;
  }
}
