import CategoryDAO from "../../src/dao/categoryDAO";
import chai from "chai";
import { expect } from "chai";
import { CategoryDocument } from "../../src/schemaModels/category.model";

chai.should();

describe("CategoryDao Unit Testings", async () => {
  let testCategory: CategoryDocument;
  let categoryArray: Record<string, any>;
  const categoryDAO = new CategoryDAO();
  before(async () => {
    await categoryDAO.add({ name: "Test Category One" });
  });

 await new Promise<void>((resolve,reject)=>{
     it("Check Add Category", async () => {
         testCategory = await categoryDAO.add({ name: "Test Category" });
         expect(testCategory).to.be.a("object");
         after(async () => {
             await categoryDAO.delete(testCategory._id);
             resolve();
         });
     });
 })

  it("Check Get All Categories", async () => {
    categoryArray = await categoryDAO.getAll({
      sortBy: " name",
      query: "",
      page: 1,
      limit: 100,
      filter: "",
    });
    console.log(categoryArray.items);
    expect(categoryArray.total).to.eql(1);
    expect(categoryArray.items).to.be.a("array");
  });

  after(async () => {
    categoryArray.items.map(async (category: any) => {
      await categoryDAO.delete(category._id);
    });
  });
});
