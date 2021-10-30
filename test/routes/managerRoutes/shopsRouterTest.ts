import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../../src/index";
import chaiThings from "chai-things";
import UserDAO from "../../../src/dao/userDAO";
import WarehouseDAO from "../../../src/dao/warehouseDAO";
import { UserDocument } from "../../../src/schemaModels/user.model";
import { WarehouseDocument } from "../../../src/schemaModels/warehouse.model";
import ShopDAO from "../../../src/dao/shopDAO";
import { ShopDocument } from "../../../src/schemaModels/shop.model";
import SalespersonShopsDAO from "../../../src/dao/salespersonShopsDAO";
chai.should();
chai.use(chaiHttp);
chai.use(chaiThings);

describe("manager/shops Routes Tests", () => {
  const userDao = new UserDAO();
  const warehouseDao = new WarehouseDAO();
  const shopDao = new ShopDAO();
  const salespersonShopsDAO = new SalespersonShopsDAO();
  let testSalesperson: UserDocument;
  let testWarehouse: WarehouseDocument;
  let testShop: ShopDocument;
  let testSalespersonShopId: string;

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
    testShop = await shopDao.add({
      name: "Dilshan Stores",
      email: "dilshan@gmail.com",
      telephone: "0779667936",
      location: "Gampaha",
      longitude: "7.409",
      latitude: "80.098",
      ownerName: "Dilshan",
      address: "245/4, Batapotha, Gampaha",
      warehouse: testWarehouse._id,
    });
  });
  describe("GET /api/manager/shops/warehouse/id", () => {
    it("It should get all warehouse shops", (done) => {
      chai
        .request(app)
        .get(`/api/manager/shops/warehouse/${testWarehouse._id}?sortBy=+name`)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.a("object");
          res.body.should.have.property("shops");
          res.body.shops.should.all.have.property("name");
          res.body.shops.should.all.have.property("ownerName");
          res.body.shops.should.all.have.property("email");
          res.body.shops.should.all.have.property("longitude");
          res.body.shops.should.all.have.property("latitude");
          done();
        });
    });
  });
  describe("POST /api/manager/shops/:id", () => {
    it("It should assign shop to the salesperson", (done) => {
      chai
        .request(app)
        .post(`/api/manager/shops/${testSalesperson._id}`)
        .send({
          shops: [testShop._id],
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.a("object");
          res.body.should.have.property("id");
          testSalespersonShopId = res.body.id;
          done();
        });
    });
      it("It should give validation error", (done) => {
          chai
              .request(app)
              .post(`/api/manager/shops/${testSalesperson._id}`)
              .send({
                  shop: [testShop._id],
              })
              .end((err, res) => {
                  res.should.have.status(401);
                  done();
              });
      });
  });
  describe("GET /api/manager/shops/id", () => {
    it("It should get all shops that are assigned to given salesperson", (done) => {
      chai
        .request(app)
        .get(`/api/manager/shops/${testSalesperson._id}?sortBy=+name`)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.a("object");
          res.body.should.have.property("shops");
          res.body.shops.should.all.have.property("name");
          res.body.shops.should.all.have.property("ownerName");
          res.body.shops.should.all.have.property("email");
          res.body.shops.should.all.have.property("longitude");
          res.body.shops.should.all.have.property("latitude");
          done();
        });
    });
  });
  after(async () => {
    await shopDao.delete(testShop._id);
    await salespersonShopsDAO.delete(testSalespersonShopId);
    await userDao.delete(testSalesperson._id);
    await warehouseDao.delete(testWarehouse._id);
  });
});
