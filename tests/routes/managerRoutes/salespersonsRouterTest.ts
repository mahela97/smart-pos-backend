import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import chaiThings from "chai-things";
import WarehouseDAO from "../../../src/dao/warehouseDAO";
import { WarehouseDocument } from "../../../src/schemaModels/warehouse.model";
import { UserDocument } from "../../../src/schemaModels/user.model";
import UserDAO from "../../../src/dao/userDAO";
import app from "../../../src";
chai.should();
chai.use(chaiHttp);
chai.use(chaiThings);

describe("manager/salespersons Routes Tests", () => {
  const userDao = new UserDAO();
  const warehouseDao = new WarehouseDAO();
  let testWarehouse: WarehouseDocument;
  let testSalesperson: UserDocument;
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
  });
  describe("POST api/manager/salespersons", () => {
    let testUser: UserDocument;
    it("It should add new salesperson", (done) => {
      chai
        .request(app)
        .post("/api/manager/salespersons")
        .send({
          firstName: "Test Salesperson",
          uid: "uid",
          lastName: "Salesperson",
          telephone: "0779667935",
          email: "testSalesperson2@gmail.com",
          role: "salesperson",
          warehouseId: testWarehouse._id,
        })
        .end((err, res) => {
          res.should.have.status(201);
          testUser = res.body.message;
          expect(res.body.message).to.be.a("object");
          expect(JSON.parse(JSON.stringify(res.body.message))).to.have.any.keys(
            "firstname",
            "uid",
            "lastName",
            "email",
            "role"
          );
          expect(JSON.parse(JSON.stringify(res.body.message.role))).to.be.equal(
            "salesperson"
          );
          done();
        });
    });
    it("It Should give ID already exist error", (done) => {
      chai
        .request(app)
        .post("/api/manager/salespersons")
        .send({
          firstName: "Test Salesperson",
          uid: "uid",
          lastName: "Salesperson",
          telephone: "0779667935",
          email: "testSalesperson2@gmail.com",
          role: "salesperson",
          warehouseId: testWarehouse._id,
        })
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.have.a("object");
          res.body.should.have.property("message", "ID already exist.");
          done();
        });
    });
    it("It should Give Validation error", (done) => {
      chai
        .request(app)
        .post("/api/admin/managers")
        .send({
          firstName: "Test Salesperson",
          uid: "uid",
          lastName: "Salesperson",
          telephone: "0779667935",
          role: "salesperson",
          warehouseId: testWarehouse._id,
        })
        .end((err, res) => {
          res.should.have.status(404);
          expect(res.body.message).to.be.a.string('"email" is required');
          done();
        });
    });
    after(async () => {
      await userDao.delete(testUser._id);
    });
  });
  describe("GET /api/manager/salespersons/getAll/warehouse/:id", () => {
    it("It should get all salesperson in given warehouse", (done) => {
      chai
        .request(app)
        .get(
          `/api/manager/salespersons/getAll/warehouse/${testWarehouse._id}?sortBy=+firstName`
        )
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body.items).to.be.a("array");
          res.body.items.should.all.have.property("firstName");
          res.body.items.should.all.have.property("lastName");
          res.body.items.should.all.have.property("uid");
          res.body.items.should.all.have.property("role", "salesperson");
          res.body.items.should.all.have.property("telephone");
          done();
        });
    });
  });

  describe("GET  api/manager/salespersons/:id", () => {
    it("It should return the salesperson to given ID", (done) => {
      chai
        .request(app)
        .get(`/api/manager/salespersons/${testSalesperson._id}`)
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body.result).to.be.a("object");
          expect(JSON.parse(JSON.stringify(res.body.result))).to.have.any.keys(
            "firstname",
            "uid",
            "lastName",
            "email",
            "role"
          );
          expect(JSON.parse(JSON.stringify(res.body.result.role))).to.be.equal(
            "salesperson"
          );
          done();
        });
    });
    it("It should give User Not Found error", (done) => {
      chai
        .request(app)
        .get(`/api/manager/salespersons/123456789`)
        .end((err, res) => {
          res.should.have.status(422);
          expect(res.body).to.be.a("object").empty;
          done();
        });
    });
  });
  describe("PATCH api/manager/salespersons/:id", () => {
    it("It should edit the salesperson", (done) => {
      chai
        .request(app)
        .patch(`/api/manager/salespersons/${testSalesperson._id}`)
        .send({
          firstName: "Edited Test Salesperson",
          uid: "uid",
          lastName: "Salesperson",
          telephone: "0714589230",
          email: "testSalesperson2@gmail.com",
          role: "salesperson",
          warehouseId: testWarehouse._id,
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.message.should.have.a("object");
          done();
        });
    });
    it("It should give validation error response", (done) => {
      chai
        .request(app)
        .patch(`/api/manager/salespersons/${testSalesperson._id}`)
        .send({
          uid: "uid",
          telephone: "0714589230",
          email: "testSalesperson2@gmail.com",
          role: "salesperson",
          warehouseId: testWarehouse._id,
        })
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
  after(async () => {
    await userDao.delete(testSalesperson._id);
    await warehouseDao.delete(testWarehouse._id);
  });
});
