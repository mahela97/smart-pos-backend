import OrderDAO from "../../../dao/orderDAO";
import OrderModel from "../../../models/orderModel";
import DailyProductsDAO from "../../../dao/dailyProductsDAO";
import { OrderDocument } from "../../../schemaModels/order.model";
import ProductObjectModel from "../../../models/productObjectModel";
import EmailService from "../../emailService/emailService";

export default class AddOrderService {
  constructor(
    protected orderDAO: OrderDAO,
    protected dailyProductDAO: DailyProductsDAO
  ) {}

  async addOrder(data: OrderModel,emailService: EmailService, shopEmail: string): Promise<void> {

    await emailService.sendMail(
        [shopEmail],
        "New Manager Account Login Credentials",
        `<h3>Total Price - ${data.totalPrice}</h3>`
    );

    const dailyProducts =
      await this.dailyProductDAO.getDailyProductsOfOneSalesperson(
        data.salesperson
      );
    if (!dailyProducts) {
      throw new Error("No products has assigned");
      return;
    }
    const dailyProductId: Map<string, any> = new Map<string, any>();

    dailyProducts.dailyProducts.map((product: any) =>
      dailyProductId.set(product.product._id.toString(), {
        product: product.product._id,
        quantity: product.quantity,
        sales: product.sales,
      })
    );
    const orders: OrderDocument = await this.orderDAO.add(data);
    const dailyProductIds: string[] = [
      ...Object.keys(Object.fromEntries(dailyProductId)),
    ];
    // eslint-disable-next-line array-callback-return
    orders.products.map((order: ProductObjectModel) => {
      if (dailyProductIds.includes(order.product.toString())) {
        if (dailyProductId.get(order.product.toString())) {
          dailyProductId.get(order.product.toString()).sales += order.quantity;
        }
      }
    });
    await this.dailyProductDAO.updateDailyProducts(
      dailyProducts._id,
      Object.values(Object.fromEntries(dailyProductId))
    );
  }
}
