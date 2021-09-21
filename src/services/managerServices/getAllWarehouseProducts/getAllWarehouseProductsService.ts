import WarehouseDAO from "../../../dao/warehouseDAO";

export default class GetAllWarehouseProductsService {
  constructor(protected warehouseDAO: WarehouseDAO) {}

  async getAllWarehouseProducts(
    id: string,
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    const result = await this.warehouseDAO.getAllWarehouseProducts(id, data);

    return result;
  }
}
