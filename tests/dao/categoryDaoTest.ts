import CategoryDAO from "../../src/dao/categoryDAO";
import chai from "chai";
import { expect } from "chai";
import { CategoryDocument } from "../../src/schemaModels/category.model";

chai.should();

describe("CategoryDao Unit Testings", async () => {
  const categoryDAO = new CategoryDAO();

  describe("Check Add Category", () => {
    let newCategory: CategoryDocument;
    const category = { name: "Test Category" };
    it("Should add new category", async () => {
      newCategory = await categoryDAO.add(category);
      expect(newCategory).to.be.a("object");
      expect(newCategory).to.have.property("name");
      expect(newCategory).to.include(category);
    });
    after(async () => {
      await categoryDAO.delete(newCategory._id);
    });
  });

  describe("Check Get All Categories", () => {
    let categoryArray: Record<string, any>;

    before(async () => {
      await categoryDAO.add({ name: "Test Category One" });
      await categoryDAO.add({ name: "Test Category Two" });
    });
    it("Should return all categories", async () => {
      categoryArray = await categoryDAO.getAll({
        sortBy: " name",
        query: "",
        page: 1,
        limit: 100,
        filter: "",
      });
      expect(categoryArray.total).to.eql(2);
      expect(categoryArray.items).to.be.a("array");
    });
    after(async () => {
      categoryArray.items.map(async (category: any) => {
        await categoryDAO.delete(category._id);
      });
    });
  });
});
