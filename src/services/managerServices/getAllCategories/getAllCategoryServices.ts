import CategoryDAO from "../../../dao/categoryDAO";

export default class GetAllCategoryService {
  constructor(protected categoryDAO: CategoryDAO) {}

  async getAllCategories(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    const result = await this.categoryDAO.getAll(data);
    return result;
  }
}