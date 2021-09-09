import WarehouseDAO from "../../../dao/warehouseDAO";
import { WarehouseDocument } from "../../../schemaModels/warehouse.model";

export default class GetOneWarehouseService {
  constructor(protected warehouseDao: WarehouseDAO) {}

  async getWarehouse(id: string): Promise<WarehouseDocument> {
    const result = this.warehouseDao.findOne(id);
    return result;
  }
}
