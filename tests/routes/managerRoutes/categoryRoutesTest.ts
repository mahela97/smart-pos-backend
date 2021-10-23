import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../../src/index";
import CategoryDAO from "../../../src/dao/categoryDAO";
import chaiThings from "chai-things";
chai.should();
chai.use(chaiHttp);
chai.use(chaiThings);

describe("/manager/category Routes Tests", () => {
  let categoryDAO: CategoryDAO;
  before(() => {
    categoryDAO = new CategoryDAO();
  });
  describe("POST /api/manager/category", () => {
    let id: string;
    it("It should add new category", (done) => {
      const testCategory = { name: "Test Category" };
      chai
        .request(app)
        .post("/api/manager/category")
        .send(testCategory)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.a("object");
          res.body.should.have.property("id");
          id = res.body.id;
          done();
        });
    });
    it("It should give validation error response", (done) => {
      chai
        .request(app)
        .post("/api/manager/category")
        .send({})
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
    after(async () => {
      await categoryDAO.delete(id);
    });
  });
  describe("GET /api/manager/category", () => {
    let id: string;
    before((done) => {
      const testCategory = { name: "Test Category" };
      chai
        .request(app)
        .post("/api/manager/category")
        .send(testCategory)
        .end((err, res) => {
          id = res.body.id;
          done();
        });
    });
    it("It should get all categories", (done) => {
      chai
        .request(app)
        .get("/api/manager/category?sortBy=+name")
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.a("object");
          res.body.should.have.property("totalItems");
          res.body.should.have.property("items");
          res.body.items.should.all.have.property("name");
          done();
        });
    });
    after(async () => {
      await categoryDAO.delete(id);
    });
  });
});
