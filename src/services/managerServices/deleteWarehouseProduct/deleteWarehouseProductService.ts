import WarehouseDAO from "../../../dao/warehouseDAO";

export default class DeleteWarehouseProductService {
    constructor(protected warehouseDAO: WarehouseDAO) {}

    async deleteWarehouseProduct(warehouseId: string, productId: string): Promise<any> {
        const result = this.warehouseDAO.deleteWarehouseProduct(warehouseId, productId);
        return result;
    }
}
