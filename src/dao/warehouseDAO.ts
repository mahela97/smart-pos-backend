import mongodb = require("mongodb");
import Warehouse, { WarehouseDocument } from "../schemaModels/warehouse.model";
import Dao from "../interfaces/dao";
import QueryHelper from "../utill/QueryHelper";
import ProductObjectModel from "../models/productObjectModel";

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
      .populate(["salespersonId", "products.product"]);
  }

  public async assignManager(
    managerId: string,
    warehouseId: string
  ): Promise<void> {
    const result = await this.model.findByIdAndUpdate(warehouseId, {
      managerId,
    });
    console.log(result);
  }

  public async addWarehouseProduct(
    warehouseId: string,
    warehouseProduct: ProductObjectModel
  ): Promise<void> {
    await this.model.findByIdAndUpdate(new ObjectID(warehouseId), {
      $push: { products: warehouseProduct },
    });
  }

  public async deleteWarehouseProduct(
    warehouseId: string,
    product: string
  ): Promise<void> {
    await this.model.findByIdAndUpdate(new ObjectID(warehouseId), {
      $pull: { products: { product } },
    });
  }

  public async getAllWarehouseProducts(
    id: string,
    filterData: Record<string, any>
  ): Promise<Partial<WarehouseDocument>> {
    console.log(filterData);
    const result = await this.model
      .findById(id)
      .populate({path:"products.product",match:{name:{$regex:filterData.query,$options:"i"}}})
      .select("products")
      .sort(filterData.sortBy);
    return result;
  }

  public async getAllProductsOfWarehouse(
    id: string
  ): Promise<Partial<WarehouseDocument>> {
    const result = await this.model.findById(id).select("products");
    return result;
  }
}
