import ShopDAO from "../../../dao/shopDAO";

export default class GetAllWarehouseShopsService {
  constructor(protected shopDAO: ShopDAO) {}

  async getAllWarehouseShops(
    id: string,
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    const result = await this.shopDAO.getAllWarehouseShops(id, data);
    return result;
  }
}
