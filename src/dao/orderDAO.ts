import Order from "../schemaModels/order.model";
import Dao from "../interfaces/dao";
import QueryHelper from "../utill/QueryHelper";

export default class OrderDAO extends Dao {
    constructor() {
        super(Order);
    }

    public async getAll(filterData: Record<string, any>): Promise<Record<string, any>>{
        const queryHelper = new QueryHelper(
            filterData.query,
            ["shop"],
            ["products","shop",],
            filterData.sortBy,
            filterData.filter,
            filterData.page,
            filterData.limit
        );
        return queryHelper.generate(Order);
    }
}