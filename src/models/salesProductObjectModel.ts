import ProductModel from "./productModel";

interface SalesProductObjectModel {
  _id: string;
  product: ProductModel;
  quantity: number;
  sales: number;
}

export default SalesProductObjectModel;
