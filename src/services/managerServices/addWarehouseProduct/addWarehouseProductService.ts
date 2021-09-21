import WarehouseDAO from "../../../dao/warehouseDAO";
import ProductObjectModel from "../../../models/productObjectModel";

export default class AddWarehouseProductService {
  constructor(protected warehouseDAO: WarehouseDAO) {}

  async addWarehouseProduct(
    warehouseId: string,
    warehouseProduct: ProductObjectModel
  ): Promise<void> {
    const result = await this.warehouseDAO.getAllProductsOfWarehouse(
      warehouseId
    );
    let hasproduct = false;
    result.products?.map(async (p) => {
      if (p.product.toString() === warehouseProduct.product) {
        hasproduct = true;
      }
    });
    if (!hasproduct) {
      await this.warehouseDAO.addWarehouseProduct(
        warehouseId,
        warehouseProduct
      );
    } else {
      throw new Error("This product is already added");
    }
  }
}
