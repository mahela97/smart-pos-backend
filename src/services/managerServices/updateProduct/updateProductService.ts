import ProductDAO from "../../../dao/productDAO";
import ProductModel from "../../../models/productModel";

export default class UpdateProductService {
  constructor(protected productDao: ProductDAO) {}

  async updateProduct(
    productId: string,
    productDetails: Partial<ProductModel>
  ): Promise<void> {
    await this.productDao.updateProduct(productId, productDetails);
  }
}
