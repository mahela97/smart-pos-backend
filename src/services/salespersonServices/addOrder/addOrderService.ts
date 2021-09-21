import OrderDAO from "../../../dao/orderDAO";
import OrderModel from "../../../models/orderModel";
import DailyProductsDAO from "../../../dao/dailyProductsDAO";

export default class AddOrderService {
  constructor(
    protected orderDAO: OrderDAO,
    protected dailyProductDAO: DailyProductsDAO
  ) {}

  async addOrder(data: OrderModel): Promise<string> {
    const result = await this.orderDAO.add(data);
    const res = await this.dailyProductDAO.getDailyProductsOfOneSalesperson(
      data.salesperson
    );
    // const orderProducts: Map<string, any> = new Map<string, any>();
    // data.products.forEach((product) => {
    //   orderProducts.set(product.product, product.quantity);
    // });
    // const updatedDailyProducts: DailyProductModel[] = [];
    //
    // result[0].dailyProducts.forEach((p: any) => {
    //   if (orderProducts.get(p.product)) {
    //     updatedDailyProducts.push();
    //   }
    // });
    console.log(res);
    return result._id;
  }
}
