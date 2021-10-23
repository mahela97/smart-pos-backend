import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../../src/index";
// import CategoryDAO from "../../../src/dao/categoryDAO";
chai.should();
chai.use(chaiHttp);

describe("Category Routes Tests", () => {
  // let categoryDAO: CategoryDAO;
  before(() => {
    // categoryDAO = new CategoryDAO();
  });
  describe("POST add category /api/manager/category", () => {
    let testCategory: Record<string, any>;
    it("It should add new category", (done) => {
      testCategory = { name: "Test Category" };
      console.log(testCategory);
      chai.request(app)
      .post("/api/manager/category/")
        .send(testCategory)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.a("object");
          res.body.should.have.property("id");
          console.log(res.body);
      done();
        });
    });
    after(async () => {
      // await categoryDAO.delete(id);
    });
  });
});
