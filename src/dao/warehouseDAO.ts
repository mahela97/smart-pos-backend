import mongodb = require("mongodb");
import Warehouse, { WarehouseDocument } from "../schemaModels/warehouse.model";
import Dao from "../interfaces/dao";
import QueryHelper from "../utill/QueryHelper";

const { ObjectID } = mongodb;

export default class WarehouseDAO extends Dao {
  constructor() {
    super(Warehouse);
  }

  public async getAll(
    filterData: Record<string, any>
  ): Promise<Record<string, any>> {
    const queryHelper = new QueryHelper(
      filterData.query,
      ["name"],
      ["managerId", "salesPersonId"],
      filterData.sortBy,
      filterData.filter,
      filterData.page,
      filterData.limit
    );

    return queryHelper.generate(Warehouse);
  }

  public async getOneWarehouse(id: string): Promise<WarehouseDocument> {
    return this.model
      .findById(id)
      .populate("managerId")
      .populate("salespersonId");
  }

  public async assignManager(
    managerId: string,
    warehouseId: string
  ): Promise<void> {
    await this.model.findByIdAndUpdate(new ObjectID(warehouseId), {
      managerId,
    });
  }
}
