import OrderDAO from "../../../dao/orderDAO";
import OrderModel from "../../../models/orderModel";

export default class UpdateShopOrderDueAmountService {
  constructor(protected orderDAO: OrderDAO) {}

  async updateShopOrderDueAmount(
    orderId: string,
    orderState: Partial<OrderModel>
  ): Promise<void> {
    await this.orderDAO.updateReceivedAmount(orderId, orderState);
  }
}
