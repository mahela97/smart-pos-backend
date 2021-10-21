import LeaveDAO from "../../src/dao/leaveDAO";
import UserDAO from "../../src/dao/userDAO";
import chai from "chai";
import { expect } from "chai";
import { UserDocument } from "../../src/schemaModels/user.model";
// import { LeaveDocument } from "../../src/schemaModels/leave.model";

chai.should();

describe("LeaveDAO Unit Testings", () => {
  const leaveDAO = new LeaveDAO();
  const userDao = new UserDAO();
  let user: UserDocument;
  before(async () => {
    user = await userDao.add({
      firstName: "Test",
      uid: "uid",
      archived: false,
      lastName: "Add",
      telephone: "0779667935",
      email: "addUser@gmail.com",
      role: "salesperson",
    });
  });
  describe("Check add leave", () => {
    let leave: { id: string };
    it("Should add new leave", async () => {
      leave = await leaveDAO.add({
        userId: user._id,
        description: "Family Problem",
        approved: "pending",
        from: "2021/09/09",
        to: "2021/09/11",
      });
      expect(leave).to.be.a("object");
      expect(leave).to.have.property("id");
    });
    after(async () => {
      await leaveDAO.delete(leave.id);
    });
  });
  describe("Check get All Leaves", () => {
    let allLeaves: Record<string, any>;
    before(async () => {
      await leaveDAO.add({
        userId: user._id,
        description: "Family Problem",
        approved: "pending",
        from: "2021/10/09",
        to: "2021/10/11",
      });
      await leaveDAO.add({
        userId: user._id,
        description: "Covid-19 Affected",
        approved: "pending",
        from: "2021/10/19",
        to: "2021/10/21",
      });
    });
    it("Should return all leaves", async () => {
      allLeaves = await leaveDAO.getAll({
        sortBy: " name",
        query: "pending",
        page: 1,
        limit: 100,
        filter: "",
      });
      expect(allLeaves.total).to.eql(2);
      expect(allLeaves.items).to.be.a("array");
    });
    after(async () => {
      allLeaves.items.map(async (leave: any) => {
        await leaveDAO.delete(leave._id);
      });
    });
  });
  describe("Check Update Leave", () => {
    let leave: { id: string };
    let updatedLeaves: Record<string, any>;
    before(async () => {
      leave = await leaveDAO.add({
        userId: user._id,
        description: "Family Problem",
        approved: "pending",
        from: "2021/10/09",
        to: "2021/10/11",
      });
    });
    it("Should update leave request", async () => {
      await leaveDAO.updateLeave(leave.id, { approved: "approved" });
      updatedLeaves = await leaveDAO.getAll({
        sortBy: " name",
        query: "approved",
        page: 1,
        limit: 100,
        filter: "",
      });
      expect(updatedLeaves.total).to.eql(1);
      expect(updatedLeaves.items).to.be.a("array");
    });
    after(async () => {
      updatedLeaves.items.map(async (leave: any) => {
        await leaveDAO.delete(leave._id);
      });
    });
  });
  after(async () => {
    await userDao.delete(user._id);
  });
});
