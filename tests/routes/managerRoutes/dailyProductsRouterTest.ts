import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../../src/index";
import CategoryDAO from "../../../src/dao/categoryDAO";
import chaiThings from "chai-things";
import UserDAO from "../../../src/dao/userDAO";
import WarehouseDAO from "../../../src/dao/warehouseDAO";
import DailyProductsDAO from "../../../src/dao/dailyProductsDAO";
import ProductDAO from "../../../src/dao/productDAO";
import { UserDocument } from "../../../src/schemaModels/user.model";
import { WarehouseDocument } from "../../../src/schemaModels/warehouse.model";
import { DailyProductDocument } from "../../../src/schemaModels/dailyProduct.model";
import { ProductDocument } from "../../../src/schemaModels/product.model";
import { CategoryDocument } from "../../../src/schemaModels/category.model";
import moment from "moment";
chai.should();
chai.use(chaiHttp);
chai.use(chaiThings);

describe("/manager/dailyProducts Routes Tests", () => {
  const userDao = new UserDAO();
  const warehouseDao = new WarehouseDAO();
  const dailyProductsDAO = new DailyProductsDAO();
  const productDao = new ProductDAO();
  const categoryDAO = new CategoryDAO();
  let testSalesperson: UserDocument;
  let testWarehouse: WarehouseDocument;
  let testDailyProduct: DailyProductDocument;
  let testProduct: ProductDocument;
  let testCategory: CategoryDocument;
  before(async () => {
    testCategory = await categoryDAO.add({ name: "Test Category" });
    testProduct = await productDao.add({
      name: "Test Product",
      categoryId: testCategory._id,
      unitPrice: 100.75,
      description: "test product",
      photo: "photo",
      archived: false,
    });
    testWarehouse = await warehouseDao.add({
      name: "Test warehouse",
      telephone: "11111111111",
      district: "Test District",
      town: "Test Town",
      products: [
        {
          product: testProduct._id,
          quantity: 50,
        },
      ],
    });
    testSalesperson = await userDao.add({
      firstName: "Test",
      uid: "uid",
      archived: false,
      lastName: "Salesperson",
      telephone: "0779667935",
      email: "testSalesperson@gmail.com",
      role: "salesperson",
      warehouseId: testWarehouse._id,
    });
    testDailyProduct = await dailyProductsDAO.add({
      dailyProducts: [
        {
          product: testProduct._id,
          quantity: 10,
          sales: 5,
        },
      ],
      salesperson: testSalesperson._id,
      createdAt: moment(),
    });
  });
  describe("POST /api/manager/dailyProducts/warehouseId", () => {
    let id: string;
    it("It should add new dailyProduct", (done) => {
      chai
        .request(app)
        .post(`/api/manager/dailyProducts/${testWarehouse._id}`)
        .send({
            dailyProducts: [
                {
                    product: testProduct._id,
                    quantity: 10,
                    sales: 5,
                },
            ],
            salesperson: testSalesperson._id,
            createdAt: moment(),
        })
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
        .post(`/api/manager/dailyProducts/${testWarehouse._id}`)
        .send({
            dailyProducts: [
                {
                    product: testProduct._id,
                    quantity: 10,
                    sales: 5,
                },
            ],
            createdAt: moment(),
        })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
    after(async () => {
      await categoryDAO.delete(id);
    });
  });
  describe("GET /api/manager/dailyProducts/salespersonId", () => {
    it("It should get all dailyProducts", (done) => {
      chai
        .request(app)
          .get(`/api/manager/dailyProducts/${testSalesperson._id}/?date=${moment()}`)
          .end((err, res) => {
              res.should.have.status(201);
              res.body.should.have.a("object");
              res.body.should.have.property("dailyProducts");
              res.body.dailyProducts.should.all.have.property("product");
              res.body.dailyProducts.should.all.have.property("quantity");
              res.body.dailyProducts.should.all.have.property("sales");
              done();
        });
    });
  });
  after(async () => {
    await categoryDAO.delete(testCategory._id);
    await productDao.delete(testProduct._id);
    await dailyProductsDAO.delete(testDailyProduct._id);
    await userDao.delete(testSalesperson._id);
    await warehouseDao.delete(testWarehouse._id);
  });
});
