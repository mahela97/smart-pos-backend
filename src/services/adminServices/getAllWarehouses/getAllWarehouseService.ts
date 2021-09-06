import WarehouseDAO from "../../../dao/warehouseDAO";

export default class GetAllWarehouseService{
    constructor(protected warehouseDAO:WarehouseDAO) {

    }

    async getAllWarehouses(data:Record<string,any>):Promise<Record<string,any>>{
        const result = await this.warehouseDAO.getAll(data);
        return result;

    }
}