import ProductModel from "../models/productModel";
import Product, { ProductDocument } from "../schemaModels/product.model";
import Dao from "../interfaces/dao";

export default class ProductDAO extends Dao {
    constructor() {
        super(Product);
    }

    public async add(productData: ProductModel): Promise<ProductDocument> {
        return super.add(productData);
    }
}