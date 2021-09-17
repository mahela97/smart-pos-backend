import ProductDAO from "../../../dao/productDAO";
import ProductModel from "../../../models/productModel";

export default class AddProductService {
  constructor(protected productDAO: ProductDAO) {}

  async addProduct(data: ProductModel): Promise<string> {
    const result = await this.productDAO.add(data);
    return result._id;
  }
}
