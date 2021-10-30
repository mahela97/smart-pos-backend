import chai, {expect} from "chai";
import chaiHttp from "chai-http";
import app from "../../../src/index";
import LeaveDAO from "../../../src/dao/leaveDAO";
import chaiThings from "chai-things";
import { LeaveDocument } from "../../../src/schemaModels/leave.model";
import { UserDocument } from "../../../src/schemaModels/user.model";
import UserDAO from "../../../src/dao/userDAO";
import { WarehouseDocument } from "../../../src/schemaModels/warehouse.model";
import WarehouseDAO from "../../../src/dao/warehouseDAO";

chai.should();
chai.use(chaiHttp);
chai.use(chaiThings);

describe("manager/leaves Routes Tests", () => {
  const leaveDAO = new LeaveDAO();
  const userDao = new UserDAO();
  const warehouseDao = new WarehouseDAO();
  let testWarehouse: WarehouseDocument;
  let leave: LeaveDocument;
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
    leave = await leaveDAO.add({
      userId: testSalesperson._id,
      description: "Family Problem",
      approved: "pending",
      from: "2021/09/09",
      to: "2021/09/11",
    });
  });
  describe("GET /api/manager/leaves", () => {
    it("It should get all leaves", (done) => {
      chai
        .request(app)
        .get("/api/manager/leaves?sortBy=+name&query=pending")
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.a("object");
          res.body.should.have.property("totalItems");
          res.body.should.have.property("items");
          res.body.items.should.all.have.property("approved", "pending");
          res.body.items.should.all.have.property("description");
          res.body.items.should.all.have.property("from");
          res.body.items.should.all.have.property("to");
          done();
        });
    });
  });

  describe("PATCH /api/manager/leaves/id", () => {
    it("It should update leave", (done) => {
      chai
        .request(app)
        .patch(`/api/manager/leaves/${leave._id}`)
        .send({
          approved: "approved",
        })
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body.success).to.be.equal(1);
        });
      done();
    });
    it("It should give validation error response", (done) => {
      chai.request(app)
          .patch(`/api/manager/leaves/${leave._id}`)
          .send({
            states: "approved",
          })
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
    });
  });

  after(async () => {
    await leaveDAO.delete(leave._id);
    await userDao.delete(testSalesperson._id);
    await warehouseDao.delete(testWarehouse._id);
  });
});
