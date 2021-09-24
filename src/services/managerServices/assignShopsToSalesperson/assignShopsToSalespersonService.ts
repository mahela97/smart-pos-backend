import SalespersonShopsDAO from "../../../dao/salespersonShopsDAO";

export default class AssignShopsToSalespersonService {
  constructor(protected salespersonShopsDAO: SalespersonShopsDAO) {}

  async assignShopsToSalesperson(id: string, data: string[]): Promise<string> {
    const result1 = await this.salespersonShopsDAO.getOneSalespersonShops(id);
    if (result1) {
      await this.salespersonShopsDAO.deleteShopsOfSalesperson(id);
    }
    const result2 = await this.salespersonShopsDAO.add({
      salespersonId: id,
      shops: data,
      archived: false,
    });
    return result2._id;
  }
}
