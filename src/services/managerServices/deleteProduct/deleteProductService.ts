import ProductDAO from "../../../dao/productDAO";

export default class DeleteProductService {
    constructor(protected productDAO: ProductDAO) {}

    async deleteProduct(id: string): Promise<any> {
        const result = this.productDAO.deleteProduct(id);
        return result;
    }
}
