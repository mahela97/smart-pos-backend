import ProductDAO from "../../../dao/productDAO";
import { ProductDocument } from "../../../schemaModels/product.model";

export default class GetOneProductService {
  constructor(protected productDAO: ProductDAO) {}

  async getProduct(id: string): Promise<ProductDocument> {
    const result = this.productDAO.getOneProduct(id);
    return result;
  }
}
