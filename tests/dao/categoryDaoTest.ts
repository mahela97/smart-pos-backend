// import CategoryDAO from "../../src/dao/categoryDAO";
// import chai from "chai";
// import { expect } from "chai";
// import { CategoryDocument } from "../../src/schemaModels/category.model";
//
// chai.should();
//
// describe("CategoryDao Unit Testings", () => {
//   const categoryDAO = new CategoryDAO();
//   it("Check Add Category", async () => {
//     let testCategory: CategoryDocument;
//     testCategory = await categoryDAO.add({ name: "Test Category" });
//     console.log(testCategory);
//     expect(testCategory).to.be.a("object");
//     after(async () => {
//       await categoryDAO.delete(testCategory._id);
//     });
//   });
//
//   it("Check Get All Categories", async () => {
//     let categoryArray: ;
//     before(async () => {
//       await categoryDAO.add({ name: "Test Category One" });
//       await categoryDAO.add({ name: "Test Category Two" });
//     });
//     categoryArray = await categoryDAO.getAll({
//       query: "",
//       sortBy: "name",
//       page: "",
//       limit: 10,
//       filter: "",
//     });
//     expect(testCategory).to.be.a("object");
//     after(async () => {
//       categoryArray.forEach(async (category) => {
//         await categoryDAO.delete(category._id)
//       });
//     });
//   });
// });
