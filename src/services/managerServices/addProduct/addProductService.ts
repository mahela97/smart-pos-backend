import ProductDAO from "../../../dao/productDAO";
import ProductModel from "../../../models/productModel";

export default class AddProductService {
  constructor(protected productDAO: ProductDAO) {}

  async addProduct(data: ProductModel): Promise<string> {
    const { name } = data;
    const product = await this.productDAO.getDeletedProductByName(name);
    if (product) {
      await this.productDAO.updateProduct(product._id, data);
      return product._id;
    }
    const result = await this.productDAO.add(data);
    return result._id;
  }
}
