import moment from "moment";
import DailyProductsDAO from "../../../dao/dailyProductsDAO";
import DailyProductModel from "../../../models/dailyProductModel";
import WarehouseDAO from "../../../dao/warehouseDAO";
import ProductObjectModel from "../../../models/productObjectModel";

export default class AddDailyProductsService {
  constructor(
    protected dailyProductDAO: DailyProductsDAO,
    protected warehouseDAO: WarehouseDAO
  ) {}

  async addDailyProducts(id: string, data: DailyProductModel): Promise<any> {
    const { createdAt, dailyProducts, salesperson } = data;
    const warehouseProducts = await this.warehouseDAO.getAllProductsOfWarehouse(
      id
    );
    const warehouseProductIds: Map<string, any> = new Map<string, any>();
    warehouseProducts.products?.map((product: any) =>
      warehouseProductIds.set(product.product.toString(), product.quantity)
    );
    let checkingQuantity;
    dailyProducts.map(async (product: any) => {
      const newQuantity =
        warehouseProductIds.get(product.product._id.toString()) -
        product.quantity;
      if (newQuantity < 0) {
        checkingQuantity = `Warehouse does not contain ${product.quantity} number of ${product.product.name}`;
      }
    });
    if (checkingQuantity) {
      throw new Error(checkingQuantity);
      return;
    }
    dailyProducts.map(async (product: any) => {
      const newQuantity =
        warehouseProductIds.get(product.product._id.toString()) -
        product.quantity;
      const productObjectModel: ProductObjectModel = {
        product: product.product._id,
        quantity: newQuantity,
      };
      console.log(newQuantity);
      await this.updateWarehouseProduct(id, productObjectModel);
    });
    // add daily products
    const startDate = moment(createdAt).subtract(0, "day").startOf("day");
    const endDate = moment(createdAt).subtract(0, "day").endOf("day");
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
    return result2._id;
  }

  async updateWarehouseProduct(
    warehouseId: string,
    productObject: ProductObjectModel
  ): Promise<void> {
    const result = await this.warehouseDAO.getAllProductsOfWarehouse(
      warehouseId
    );
    result.products?.map(async (p) => {
      if (p.product.toString() === productObject.product) {
        await this.warehouseDAO.deleteWarehouseProduct(
          warehouseId,
          productObject.product
        );
        await this.warehouseDAO.addWarehouseProduct(warehouseId, productObject);
      }
    });
  }
}
