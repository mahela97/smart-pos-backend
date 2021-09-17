// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import OrderDAO from "../../../dao/orderDAO";
import {OrderDocument} from "../../../schemaModels/order.model";

export default class GetOrdersOfOneShopService{
    constructor(protected orderDAO: OrderDAO) {}

    async getOrdersOfOneShop(id: string): Promise<OrderDocument []> {
        const result = await this.orderDAO.getOrdersOfOneShop(id);
        return result;
    }
}