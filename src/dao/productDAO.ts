import mongodb = require("mongodb");
import Dao from "../interfaces/dao";
import Product, { ProductDocument } from "../schemaModels/product.model";
import QueryHelper from "../utill/QueryHelper";
import ProductModel from "../models/productModel";

const { ObjectID } = mongodb;

export default class ProductDAO extends Dao {
  constructor() {
    super(Product);
  }

  public async getAll(
    filterData: Record<string, any>
  ): Promise<Record<string, any>> {
    const queryHelper = new QueryHelper(
      filterData.query,
      ["name"],
      ["categoryId"],
      filterData.sortBy,
      filterData.filter,
      filterData.page,
      filterData.limit
    );

    return queryHelper.generate(Product);
  }

  public async getOneProduct(id: string): Promise<ProductDocument> {
    return this.model.findById(id).populate("categoryId");
  }

  public async getDeletedProductByName(name: string): Promise<ProductDocument> {
    return this.model.findOne({ name, archived: true });
  }

  public async updateProduct(
    productId: string,
    productDetails: Partial<ProductModel>
  ): Promise<void> {
    await this.model.findByIdAndUpdate(new ObjectID(productId), productDetails);
  }

  public async deleteProduct(productId: string): Promise<void> {
    await this.model.findByIdAndUpdate(new ObjectID(productId), {
      archived: true,
    });
  }
}
