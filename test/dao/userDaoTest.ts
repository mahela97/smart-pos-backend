import UserDAO from "../../src/dao/userDAO";
import chai, {expect} from "chai";
import {UserDocument} from "../../src/schemaModels/user.model";
import {WarehouseDocument} from "../../src/schemaModels/warehouse.model";
import WarehouseDAO from "../../src/dao/warehouseDAO";

chai.should();

describe("UserDao Unit Testings", () => {
    // the test container
    const userDao = new UserDAO();
    const warehouseDao = new WarehouseDAO();
    let testManager: UserDocument;
    let testWarehouse: WarehouseDocument;
    let testSalesperson: UserDocument;
    before(async () => {
        testManager = await userDao.add({
            firstName: "Test",
            uid: "123456789",
            archived: false,
            lastName: "User",
            telephone: "0779667935",
            email: "testUser@gmail.com",
            role: "manager",
        });
        testSalesperson = await userDao.add({
            firstName: "Test",
            uid: "123456789",
            archived: false,
            lastName: "Salesperson",
            telephone: "0779667935",
            email: "testSalesperson@gmail.com",
            role: "salesperson",
        });
        testWarehouse = await warehouseDao.add({
            name: "Test warehouse",
            telephone: "11111111111",
            district: "Test District",
            town: "Test Town",
        });
    });

    describe("Add user to the database", () => {
        let user: UserDocument;
        it("Should add user to the database", async () => {
            user = await userDao.add({
                firstName: "Test",
                uid: "uid",
                archived: false,
                lastName: "Add",
                telephone: "0779667935",
                email: "addUser@gmail.com",
                role: "manager",
            });
            expect(user).to.be.a("object");
            expect(JSON.parse(JSON.stringify(user))).to.have.any.keys("firstname", "uid", "lastName", "email", "role");
        });
        after(async () => {
            await userDao.delete(user._id);
        });
    });

    describe("Get User By UID", () => {
        let user: UserDocument;
        it("Should return the user matches the uid", async () => {
            user = await userDao.getUserByUid(testManager.uid);
            expect(user).to.be.a("object");
            expect(JSON.parse(JSON.stringify(user))).to.have.any.keys("firstname", "uid", "lastName", "email", "role");
            expect(user.uid).to.be.a.string("123456789");
        });
    });

    describe("Get All Unassigned Managers", () => {
        let users: UserDocument[];
        it("Should return all unassigned managers", async () => {
            users = await userDao.getAllUnassignedManagers();
            const warehouses: string[] = [];
            let managers: number = 0;
            users.forEach(u => {
                u.warehouseId && warehouses.push(u.warehouseId);
                if (u.role === "manager") {
                    managers++;
                }
            });

            expect(users).to.be.a("array");
            expect(managers).to.equal(users.length);
            expect(warehouses).to.be.a("array").that.is.empty;
        });
    });

    describe("Assign warehouse to the Manager", () => {
        let user: UserDocument;
        it("Should assign warehouse to a manager", async () => {
            await userDao.assignWarehouse(testWarehouse._id, testManager._id);
            user = await userDao.getOneManager(testManager._id);
            expect(user).to.be.a("object");
            expect(JSON.parse(JSON.stringify(user))).to.have.any.keys("firstname", "uid", "lastName", "email", "role", "warehouseId");
            expect(user.warehouseId).to.be.a("object");
            expect(JSON.parse(JSON.stringify(user.warehouseId))).to.have.any.keys("name", "telephone");

        });
        after(async () => {
            await userDao.update({$unset: {warehouseId: 1}}, testManager._id);
        });
    });

    describe("Get All Managers", () => {
        let users: Record<string, any>;
        it("Should return all managers", async () => {
            users = await userDao.getAllManagers({query: "", sortBy: "+firstName", limit: -1});
            let managers: number = 0;
            users.items.forEach((u: UserDocument) => {
                if (u.role === "manager") {
                    managers++;
                }
            });

            expect(users.items).to.be.a("array");
            expect(users.total).to.equal(managers);
        });
    });


    describe("Get All Salespersons", () => {
        let users: Record<string, any>;
        it("Should return all salespersons", async () => {
            users = await userDao.getAllSalespersons({query: "", sortBy: "+firstName", limit: -1});
            let salespersons: number = 0;
            users.items.forEach((u: UserDocument) => {
                if (u.role === "salesperson") {
                    salespersons++;
                }
            });

            expect(users.items).to.be.a("array");
            expect(users.total).to.equal(salespersons);
        });
    });
    describe("Get Manager by ID", () => {
        let user: UserDocument;
        it("Should return the manager matching the id", async () => {
            user = await userDao.getOneManager(testManager._id);

            expect(user).to.be.a("object");
            expect(JSON.parse(JSON.stringify(user))).to.have.any.keys("firstname", "uid", "lastName", "email", "role");
            expect(user.role).to.be.equal("manager");
        });
    });

    describe("Get Salesperson by ID", () => {
        let user: UserDocument;
        it("Should return the salesperson matching the id", async () => {
            user = await userDao.getOneSalesperson(testSalesperson._id);

            expect(user).to.be.a("object");
            expect(JSON.parse(JSON.stringify(user))).to.have.any.keys("firstname", "uid", "lastName", "email", "role");
            expect(user.role).to.be.equal("salesperson");
        });
    });

    describe("Edit user details of the given user", () => {
        let user: UserDocument;
        it("Should return the salesperson matching the id", async () => {
            await userDao.editUser(testManager._id, {firstName: "Change", lastName: "Test"});
            user = await userDao.findOne(testManager._id);
            expect(user).to.be.a("object");
            expect(JSON.parse(JSON.stringify(user))).to.have.any.keys("firstname", "uid", "lastName", "email", "role");
            expect(user.firstName).to.be.equal("Change");
            expect(user.lastName).to.be.equal("Test");
        });

        after(async () => {
            await userDao.editUser(testManager._id, {firstName: "Test", lastName: "User"});
        });
    });


    after(async () => {
        await userDao.delete(testManager._id);
        await warehouseDao.delete(testWarehouse._id);
        await userDao.delete(testSalesperson._id);
    });
});
