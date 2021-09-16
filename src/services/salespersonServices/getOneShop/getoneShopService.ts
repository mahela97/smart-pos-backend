import ShopDAO from "../../../dao/shopDAO";
import {ShopDocument} from "../../../schemaModels/shop.model";

export default class GetOneShopService{
    constructor(protected shopDao: ShopDAO) {}

    async getOneShop(id: string): Promise<ShopDocument>{
        const result = await this.shopDao.getOneshop(id);
        return result;
    }
}