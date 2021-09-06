import Warehouse from "../schemaModels/warehouse.model";
import Dao from "../interfaces/dao";

export default class WarehouseDAO extends Dao {
    constructor() {
        super(Warehouse);
    }
}