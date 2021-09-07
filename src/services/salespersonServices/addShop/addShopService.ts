import ShopDAO from "../../../dao/shopDAO";
import ShopModel from "../../../models/shopModel";

export default class AddShopService{
    constructor(protected shopDAO: ShopDAO) {}

    async addShop(data: ShopModel): Promise<string>{
        const result = await this.shopDAO.add(data);
        return result._id;
    }
}