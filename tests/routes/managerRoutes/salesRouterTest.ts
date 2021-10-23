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

describe("manager/sales Routes Tests", () => {
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
    testWarehouse = await warehouseDao.add({
      name: "Test warehouse",
      telephone: "11111111111",
      district: "Test District",
      town: "Test Town",
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
    testCategory = await categoryDAO.add({ name: "Test Category" });
    testProduct = await productDao.add({
      name: "Test Product",
      categoryId: testCategory._id,
      unitPrice: 100,
      description: "test product",
      photo: "photo",
      archived: false,
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
  describe("GET /api/manager/sales/warehouse", () => {
    it("It should get all salesperson's sales within the given date range", (done) => {
      chai
          .request(app)
          .get(
              `/api/manager/sales/warehouse/${
                  testWarehouse._id
              }?startDate=${moment().startOf("day")}&endDate=${moment().endOf(
                  "day"
              )}`
          )
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.have.a("object");
            res.body.should.have.property("incomes");
            res.body.incomes.should.all.have.property("income");
            done();
          });
    });
  });
  describe("GET /api/manager/sales/warehouse", () => {
    it("It should get total warehouse sales group by date within given date range", (done) => {
      chai
          .request(app)
          .get(
              `/api/manager/sales/warehousesales/${
                  testWarehouse._id
              }?startDate=${moment()
                  .subtract(7, "days")
                  .startOf("day")}&endDate=${moment().endOf("day")}`
          )
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.have.a("object");
            Object.values(res.body).should.all.have.property("totalIncome");
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
