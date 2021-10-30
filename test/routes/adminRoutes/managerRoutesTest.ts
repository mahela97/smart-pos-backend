import chai, {expect} from "chai";
import chaiHttp from "chai-http";
import app from "../../../src/index";
import UserDAO from "../../../src/dao/userDAO";
import WarehouseDAO from "../../../src/dao/warehouseDAO";
import {UserDocument} from "../../../src/schemaModels/user.model";
import {WarehouseDocument} from "../../../src/schemaModels/warehouse.model";
import chaiThings from "chai-things";

chai.should();
chai.use(chaiHttp);
chai.use(chaiThings);

describe("/admin/managers Routes Integration Tests", () => {
    const userDao = new UserDAO();
    const warehouseDao = new WarehouseDAO();
    let testAssignedManager: UserDocument;
    let testUnAssignedManager: UserDocument;
    let testWarehouse: WarehouseDocument;
    before(async () => {
        testWarehouse = await warehouseDao.add({
            name: "Test warehouse",
            telephone: "11111111111",
            district: "Test District",
            town: "Test Town",
        });
        testAssignedManager = await userDao.add({
            firstName: "Test",
            uid: "123456789",
            archived: false,
            lastName: "User",
            telephone: "0779667935",
            email: "testUser@gmail.com",
            role: "manager",
            warehouseId: testWarehouse._id
        });
        testUnAssignedManager = await userDao.add({
            firstName: "Test",
            uid: "123456789",
            archived: false,
            lastName: "User",
            telephone: "0779667935",
            email: "testUserNotAssigned@gmail.com",
            role: "manager",
        });

    });
    describe("GET admin/managers", () => {
        it("Should return all the managers", (done) => {
            chai.request(app)
                .get("/api/admin/managers?sortBy=+firstName&limit=-1")
                .end((err, res) => {
                    res.should.have.status(201);
                    expect(res.body.items).to.be.a("array");
                    res.body.items.should.all.have.property("firstName");
                    res.body.items.should.all.have.property("lastName");
                    res.body.items.should.all.have.property("uid");
                    res.body.items.should.all.have.property("role");
                    expect(res.body.items.map((e: { role: any; }) => (e.role))).to.include("manager");
                    res.body.items.should.all.have.property("telephone");
                    done();
                });
        });

    });

    describe("GET admin/managers/unassigned", () => {
        it("Should return all the unassigned managers", (done) => {
            chai.request(app)
                .get("/api/admin/managers/unassigned")
                .end((err, res) => {
                    res.should.have.status(201);
                    expect(res.body).to.be.a("object");
                    res.body.result.should.all.have.property("firstName");
                    res.body.result.should.all.have.property("lastName");
                    res.body.result.should.all.have.property("uid");
                    res.body.result.should.all.have.property("role");
                    res.body.result.should.all.not.have.property("warehouseId");
                    expect(res.body.result.map((e: { role: any; }) => (e.role))).to.include("manager");
                    res.body.result.should.all.have.property("telephone");
                    done();
                });
        });

    });

    describe("POST admin/managers/", () => {
        let testUser: UserDocument;
        it("Should Add new Manager", (done) => {
            const manager = {
                firstName: "Test",
                uid: "123456789",
                lastName: "User",
                telephone: "0779667935",
                email: "testManager@gmail.com",
                role: "manager",
                password: "Test!23456",
                rePassword: "Test!23456"
            };
            chai.request(app)
                .post("/api/admin/managers")
                .send(manager)
                .end((err, res) => {
                    res.should.have.status(201);
                    testUser = res.body.message;
                    expect(res.body.message).to.be.a("object");
                    expect(JSON.parse(JSON.stringify(res.body.message))).to.have.any.keys("firstname", "uid", "lastName", "email", "role");
                    expect(JSON.parse(JSON.stringify(res.body.message.role))).to.be.equal("manager");
                    done();
                });
        });
        after(async () => {
            await userDao.delete(testUser._id);
        });
    });

    describe("POST Validation Error admin/managers/", () => {
        it("Should Give Validation error", (done) => {
            const manager = {
                firstName: "Test",
                uid: "123456789",
                lastName: "User",
                telephone: "0779667935",
                role: "manager",
                password: "Test!23456",
                rePassword: "Test!23456"
            };
            chai.request(app)
                .post("/api/admin/managers")
                .send(manager)
                .end((err, res) => {
                    res.should.have.status(404);
                    expect(res.body.message).to.be.a.string("\"email\" is required");
                    done();
                });
        });
    });

    describe("GET  admin/managers/:id", () => {
        it("Should return the manager to given ID", (done) => {
            chai.request(app)
                .get(`/api/admin/managers/${testAssignedManager._id}`)
                .end((err, res) => {
                    res.should.have.status(201);
                    expect(res.body.result).to.be.a("object");
                    expect(JSON.parse(JSON.stringify(res.body.result))).to.have.any.keys("firstname", "uid", "lastName", "email", "role");
                    expect(JSON.parse(JSON.stringify(res.body.result.role))).to.be.equal("manager");
                    done();
                });
        });
    });


    describe("GET User Not Found admin/managers/:id", () => {
        it("Should return the manager to given ID", (done) => {
            chai.request(app)
                .get(`/api/admin/managers/123456789`)
                .end((err, res) => {
                    res.should.have.status(422);
                    expect(res.body).to.be.a("object").empty;
                    done();
                });
        });
    });


    after(async () => {
        await userDao.delete(testAssignedManager._id);
        await userDao.delete(testUnAssignedManager._id);
        await warehouseDao.delete(testWarehouse._id);
    });
});
