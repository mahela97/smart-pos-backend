import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../../../src/index";
import ProductDAO from "../../../src/dao/productDAO";
import chaiThings from "chai-things";
import CategoryDAO from "../../../src/dao/categoryDAO";
chai.should();
chai.use(chaiHttp);
chai.use(chaiThings);

describe("/manager/products Routes Tests", () => {
  let productDAO: ProductDAO;
  let categoryDAO: CategoryDAO;
  let categoryId: string;
  before((done) => {
    categoryDAO = new CategoryDAO();
    productDAO = new ProductDAO();
    const testCategory = { name: "Test Category" };
    chai
      .request(app)
      .post("/api/manager/category")
      .send(testCategory)
      .end((err, res) => {
        categoryId = res.body.id;
        done();
      });
  });
  describe("POST /api/manager/product", () => {
    let productId: string;
    it("It Should give validation error response", (done) => {
      const testProduct = {
        categoryId: categoryId,
        unitPrice: 100,
        description: "Test Product",
        photo: "photo url",
      };
      chai
        .request(app)
        .post("/api/manager/product")
        .send(testProduct)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
    it("It should add new product", (done) => {
      const testProduct = {
        name: "Test Product",
        categoryId: categoryId,
        unitPrice: 100,
        description: "Test Product",
        photo: "photo url",
      };
      chai
        .request(app)
        .post("/api/manager/product")
        .send(testProduct)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.a("object");
          res.body.should.have.property("id");
          productId = res.body.id;
          done();
        });
    });
    after(async () => {
      await productDAO.delete(productId);
    });
  });

  describe("GET /api/manager/product", () => {
    let productId: string;
    before((done) => {
      const testProduct = {
        name: "Test Product",
        categoryId: categoryId,
        unitPrice: 100,
        description: "Test Product",
        photo: "photo url",
      };
      chai
        .request(app)
        .post("/api/manager/product")
        .send(testProduct)
        .end((err, res) => {
          productId = res.body.id;
          done();
        });
    });
    it("It should get all products", (done) => {
      chai
        .request(app)
        .get("/api/manager/product?sortBy=+name")
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.a("object");
          res.body.should.have.property("totalItems");
          res.body.should.have.property("items");
          res.body.items.should.all.have.property("name");
          res.body.items.should.all.have.property("categoryId");
          res.body.items.should.all.have.property("unitPrice");
          res.body.items.should.all.have.property("description");
          res.body.items.should.all.have.property("photo");
          res.body.items.should.all.have.nested.property("categoryId.name");
          done();
        });
    });
    after(async () => {
      await productDAO.delete(productId);
    });
  });
  describe("GET /api/manager/product/id", () => {
    let productId: string;
    before((done) => {
      const testProduct = {
        name: "Test Product",
        categoryId: categoryId,
        unitPrice: 100,
        description: "Test Product",
        photo: "photo url",
      };
      chai
        .request(app)
        .post("/api/manager/product")
        .send(testProduct)
        .end((err, res) => {
          productId = res.body.id;
          done();
        });
    });
    it("It should get one product", (done) => {
      chai
        .request(app)
        .get(`/api/manager/product/${productId}`)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.a("object");
          res.body.should.have.any.keys(
            "result",
            "name",
            "unitPrice",
            "description",
            "categoryId",
            "photo"
          );
          res.body.result.should.have.property("_id", productId);
          done();
        });
    });
    after(async () => {
      await productDAO.delete(productId);
    });
  });
  describe("PATCH /api/manager/product/id", () => {
    let productId: string;
    before((done) => {
      const testProduct = {
        name: "Test Product",
        categoryId: categoryId,
        unitPrice: 100,
        description: "Test Product",
        photo: "photo url",
      };
      chai
        .request(app)
        .post("/api/manager/product")
        .send(testProduct)
        .end((err, res) => {
          productId = res.body.id;
          done();
        });
    });
    it("It should update product", (done) => {
      chai
        .request(app)
        .patch(`/api/manager/product/${productId}`)
        .send({
          name: "Updated Test Product",
          unitPrice: 200,
          description: "Updated Test Product",
          photo: "Updated photo url",
        })
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body.success).to.be.equal(1);
          done();
        });
    });
    it("It Should give validation error response", (done) => {
      chai
        .request(app)
        .patch(`/api/manager/product/${productId}`)
        .send({
          productName: "Updated Test Product",
          unitPrice: 200,
          description: "Updated Test Product",
          photo: "Updated photo url",
        })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
    after(async () => {
      await productDAO.delete(productId);
    });
  });

  describe("DELETE /api/manager/product/id", () => {
    let productId: string;
    before((done) => {
      const testProduct = {
        name: "Test Product",
        categoryId: categoryId,
        unitPrice: 100,
        description: "Test Product",
        photo: "photo url",
      };
      chai
        .request(app)
        .post("/api/manager/product")
        .send(testProduct)
        .end((err, res) => {
          productId = res.body.id;
          done();
        });
    });
    it("It should delete product", (done) => {
      chai
        .request(app)
        .delete(`/api/manager/product/${productId}`)
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body.success).to.be.equal(1);
          done();
        });
    });
    after(async () => {
      await productDAO.delete(productId);
    });
  });

  after(async () => {
    await categoryDAO.delete(categoryId);
  });
});
