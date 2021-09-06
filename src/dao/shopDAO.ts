import Shop from "../schemaModels/shop.model";
import Dao from "../interfaces/dao";

export default class ShopDAO extends Dao {
    constructor() {
        super(Shop);
    }
}