import WarehouseDAO from "../../../dao/warehouseDAO";
import ProductObjectModel from "../../../models/productObjectModel";

export default class UpdateWarehouseProductService {
  constructor(protected warehouseDAO: WarehouseDAO) {}

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
