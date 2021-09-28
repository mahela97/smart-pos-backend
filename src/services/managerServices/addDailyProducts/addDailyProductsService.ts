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

  async addDailyProducts(id: string, data: DailyProductModel): Promise<string> {
    const { createdAt, dailyProducts, salesperson } = data;
    const startDate = moment(createdAt).subtract(0, "day").startOf("day");
    const endDate = moment(createdAt).subtract(0, "day").endOf("day");
    const result1 = await this.dailyProductDAO.getAllDailyProducts(
      salesperson,
      startDate,
      endDate
    );
    const dailyProductsIds: Map<string, any> = new Map<string, any>();
    if (result1) {
      result1.dailyProducts?.map((product: any) =>
        dailyProductsIds.set(product.product._id.toString(), product.quantity)
      );
    }
    const warehouseProducts = await this.warehouseDAO.getAllProductsOfWarehouse(
      id
    );
    // if daily products are already assigned for this date, then those quantities are added to warehouse first.
    // after that new quantities are reduced from warehouse.
    const warehouseProductIds: Map<string, any> = new Map<string, any>();
    warehouseProducts.products?.forEach((product: any) => {
      let previousQuantity = 0;
      if (dailyProductsIds.get(product.product.toString())) {
        previousQuantity = dailyProductsIds.get(product.product.toString());
      }
      warehouseProductIds.set(product.product.toString(), product.quantity+previousQuantity);
    });

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
      return "Error";
    }
    dailyProducts.map(async (product: any) => {
      const newQuantity =
        warehouseProductIds.get(product.product._id.toString()) -
        product.quantity;
      const productObjectModel: ProductObjectModel = {
        product: product.product._id,
        quantity: newQuantity,
      };
      await this.updateWarehouseProduct(id, productObjectModel);
    });
    // add daily products
    let result2;
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
