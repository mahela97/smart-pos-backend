import SalespersonShopsDAO from "../../../dao/salespersonShopsDAO";
import { SalespersonShopDocument } from "../../../schemaModels/salespersonShop.model";

export default class GetSalespersonShopsService {
  constructor(protected salespersonShopsDAO: SalespersonShopsDAO) {}

  async getSalespersonShops(id: string): Promise<SalespersonShopDocument> {
    const result = await this.salespersonShopsDAO.getOneSalespersonShops(id);
    return result;
  }
}
