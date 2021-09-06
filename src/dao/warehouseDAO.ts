import Warehouse, {WarehouseDocument} from "../schemaModels/warehouse.model";
import Dao from "../interfaces/dao";
import QueryHelper from "../utill/QueryHelper";

export default class WarehouseDAO extends Dao {
    constructor() {
        super(Warehouse);
    }

    public async getAll(filterData: Record<string, any>): Promise<Record<string,any>> {
        const queryHelper = new QueryHelper(
            filterData.query,
            ["name"],
            ["managerId", "salespersonId"],
            filterData.sortBy,
            filterData.filter,
            filterData.page,
            filterData.limit
        );

        return queryHelper.generate(Warehouse);
    }
}