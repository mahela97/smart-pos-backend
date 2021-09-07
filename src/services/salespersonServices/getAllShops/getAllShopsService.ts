import ShopDAO from "../../../dao/shopDAO";

export default class GetAllShopsService {
    constructor(protected shopDAO: ShopDAO) {}

    async getAllShops(data: Record<string, any>): Promise<Record<string, any>>{
        const result = await this.shopDAO.getAll(data);
        return result;
    }
}