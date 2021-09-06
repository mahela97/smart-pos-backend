import ShopModel from "../models/shopModel";
import Shop, { ShopDocument } from "../schemaModels/shop.model";
import Dao from "../interfaces/dao";

export default class ShopDAO extends Dao {
    constructor() {
        super(Shop);
    }

    public async add(shopData: ShopModel): Promise<ShopDocument> {
        return super.add(shopData);
    }
}