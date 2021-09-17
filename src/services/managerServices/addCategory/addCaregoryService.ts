import CategoryDAO from "../../../dao/categoryDAO";
import CategoryModel from "../../../models/categoryModel";

export default class AddCategoryService {
  constructor(protected categoryDAO: CategoryDAO) {}

  async addCategory(data: CategoryModel): Promise<string> {
    const result = await this.categoryDAO.add(data);
    return result._id;
  }
}
