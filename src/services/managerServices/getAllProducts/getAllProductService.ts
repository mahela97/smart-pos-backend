import ProductDAO from "../../../dao/productDAO";

export default class GetAllCategoryService{
    constructor(protected productDAO:ProductDAO) {

    }

    async getAllProducts(data:Record<string,any>):Promise<Record<string,any>>{
        const result = await this.productDAO.getAll(data);
        return result;

    }
}