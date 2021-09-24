import moment from "moment";
import DailyProductsDAO from "../../../dao/dailyProductsDAO";
import DailyProductModel from "../../../models/dailyProductModel";
// eslint-disable-next-line import/no-cycle
// import ServiceLocator from "../../../utill/serviceLocator";
import WarehouseDAO from "../../../dao/warehouseDAO";

export default class AddDailyProductsService {
  constructor(
    protected dailyProductDAO: DailyProductsDAO,
    protected warehouseDAO: WarehouseDAO
  ) {}

  async addDailyProducts(id: string, data: DailyProductModel): Promise<string> {
    const { createdAt, dailyProducts, salesperson } = data;
    const startDate = moment(createdAt).subtract(0, "day").startOf("day");
    const endDate = moment(createdAt).subtract(0, "day").endOf("day");
    // console.log("when add");
    // console.log(createdAt);
    // console.log(startDate);
    // console.log(endDate);
    // console.log(id);
    let result2;
    const result1 = await this.dailyProductDAO.getAllDailyProducts(
      salesperson,
      startDate,
      endDate
    );
    if (result1) {
      await this.dailyProductDAO.updateDailyProductsQuantity(
        salesperson,
        dailyProducts,
        startDate,
        endDate
      );
      result2 = await this.dailyProductDAO.getAllDailyProducts(
        salesperson,
        startDate,
        endDate
      );
    } else {
      const DailyProducts = {
        dailyProducts,
        salesperson,
        createdAt: moment(createdAt),
      };
      result2 = await this.dailyProductDAO.add(DailyProducts);
    }
    // const service = ServiceLocator.updateWarehouseProduct;
    const result = await this.warehouseDAO.getAllProductsOfWarehouse(id);
    // const warehouseProducts: Map<string, any> = new Map<string, any>();
    dailyProducts.map(async (product) => {
      // console.log(product.product._id);
    });
    console.log(result);
    return result2._id;
  }
}
