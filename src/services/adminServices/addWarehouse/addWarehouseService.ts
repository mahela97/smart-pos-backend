import WarehouseDAO from "../../../dao/warehouseDAO";
import WarehouseModel from "../../../models/warehouseModel";

export default class AddWarehouseService {
    constructor(protected warehouseDAO: WarehouseDAO) {}

    async addWarehouse(data: WarehouseModel): Promise<string> {
        const result = await this.warehouseDAO.add(data);
        return result._id;
    }
}
