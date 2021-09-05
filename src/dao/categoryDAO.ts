import CategoryModel from "../models/categoryModel";
import Category, { CategoryDocument } from "../schemaModels/category.model";
import Dao from "../interfaces/dao";

export default class CategoryDAO extends Dao {
    constructor() {
        super(Category);
    }

    public async add(categoryData: CategoryModel): Promise<CategoryDocument> {
        return super.add(categoryData);
    }
}