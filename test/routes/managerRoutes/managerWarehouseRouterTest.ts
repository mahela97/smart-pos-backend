import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../../../src/index";
import CategoryDAO from "../../../src/dao/categoryDAO";
import chaiThings from "chai-things";
import WarehouseDAO from "../../../src/dao/warehouseDAO";
import ProductDAO from "../../../src/dao/productDAO";
import { WarehouseDocument } from "../../../src/schemaModels/warehouse.model";
import { ProductDocument } from "../../../src/schemaModels/product.model";
import { CategoryDocument } from "../../../src/schemaModels/category.model";
import chaiSubset from "chai-subset";
chai.should();
chai.use(chaiHttp);
chai.use(chaiThings);
chai.use(chaiSubset);

describe("manager/warehouse Routes Tests", () => {
  const warehouseDao = new WarehouseDAO();
  const productDao = new ProductDAO();
  const categoryDAO = new CategoryDAO();
  let testWarehouse: WarehouseDocument;
  let testProduct1: ProductDocument;
  let testProduct2: ProductDocument;
  let testCategory: CategoryDocument;

  before(async () => {
    testCategory = await categoryDAO.add({ name: "Test Category" });
    testProduct1 = await productDao.add({
      name: "Test Product 1",
      categoryId: testCategory._id,
      unitPrice: 100.75,
      description: "test product 1",
      photo: "photo",
      archived: false,
    });
    testProduct2 = await productDao.add({
      name: "Test Product 2",
      categoryId: testCategory._id,
      unitPrice: 100.75,
      description: "test product 2",
      photo: "photo",
      archived: false,
    });
    testWarehouse = await warehouseDao.add({
      name: "Test warehouse",
      telephone: "11111111111",
      district: "Test District",
      town: "Test Town",
      products: [{testProduct2, quantity: 100}],
    });
  });

  describe("POST /api/manager/warehouse/:id", () => {
    it("It should add new product to warehouse", (done) => {
      chai
        .request(app)
        .post(`/api/manager/warehouse/${testWarehouse._id}`)
        .send({
          product: testProduct1._id,
          quantity: 10,
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          done();
        });
    });
    it("It should give validation error", (done) => {
      chai
        .request(app)
        .post(`/api/manager/warehouse/${testWarehouse._id}`)
        .send({
          product: testProduct1._id,
        })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  describe("PATCH /api/manager/warehouse/:id", () => {
    it("It should update product quantity of the warehouse", (done) => {
      chai
        .request(app)
        .patch(`/api/manager/warehouse/${testWarehouse._id}`)
        .send({
          product: testProduct1._id,
          quantity: 50,
        })
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body.success).to.be.equal(1);
          done();
        });
    });
    it("It should give validation error", (done) => {
      chai
        .request(app)
        .patch(`/api/manager/warehouse/${testWarehouse._id}`)
        .send({
          product: testProduct1._id,
        })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  describe("GET /api/manager/warehouse/:id", () => {
    it("It should get all warehouse products", (done) => {
      chai
        .request(app)
        .get(`/api/manager/warehouse/${testWarehouse._id}?sortBy=+name`)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("products");
          res.body.products.should.all.have.property("quantity");
          done();
        });
    });
  });
  describe("GET /api/manager/warehouse/:id/details", () => {
    it("It should get warehouse details", (done) => {
      chai
        .request(app)
        .get(`/api/manager/warehouse/${testWarehouse._id}/details`)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.a("object");
          res.body.should.have.property("result");
          res.body.result.should.have.property("name");
          res.body.result.should.have.property("telephone");
          res.body.result.should.have.property("district");
          res.body.result.should.have.property("town");
          res.body.result.should.have.property("products");
          res.body.result.products.should.be.a("array");
          done();
        });
    });
  });
  after(async () => {
    await warehouseDao.delete(testWarehouse._id);
    await productDao.delete(testProduct1._id);
    await productDao.delete(testProduct2._id);
    await categoryDAO.delete(testCategory._id);
  });
});
