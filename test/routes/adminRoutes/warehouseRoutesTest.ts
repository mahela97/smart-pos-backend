import chai, {expect} from "chai";
import chaiHttp from "chai-http";
import app from "../../../src/index";
import UserDAO from "../../../src/dao/userDAO";
import WarehouseDAO from "../../../src/dao/warehouseDAO";
import {UserDocument} from "../../../src/schemaModels/user.model";
import {WarehouseDocument} from "../../../src/schemaModels/warehouse.model";
import chaiThings from "chai-things";
import DailyProductsDAO from "../../../src/dao/dailyProductsDAO";
import {DailyProductDocument} from "../../../src/schemaModels/dailyProduct.model";
import moment from "moment";
import {ProductDocument} from "../../../src/schemaModels/product.model";
import {CategoryDocument} from "../../../src/schemaModels/category.model";
import ProductDAO from "../../../src/dao/productDAO";
import CategoryDAO from "../../../src/dao/categoryDAO";

chai.should();
chai.use(chaiHttp);
chai.use(chaiThings);


describe("/admin/warehouse Routes Integration Tests", () => {
    const userDao = new UserDAO();
    const warehouseDao = new WarehouseDAO();
    const dailyProductsDAO = new DailyProductsDAO();
    const productDao = new ProductDAO();
    const categoryDAO = new CategoryDAO();
    let testSalesperson: UserDocument;
    let testUnAssignedManager: UserDocument;
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
        testUnAssignedManager = await userDao.add({
            firstName: "Test",
            uid: "123456789",
            archived: false,
            lastName: "User",
            telephone: "0779667935",
            email: "testUserNotAssigned@gmail.com",
            role: "manager",
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
        testCategory = await categoryDAO.add({name: "Test Category"});
        testProduct = await productDao.add({
            name: "Test Product",
            categoryId: testCategory._id,
            unitPrice: 100.75,
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
    describe("POST admin/warehouse", () => {
        let id: string;
        it("Should add new warehouse", (done) => {
            const warehouse = {
                district: "Test district",
                town: "Test Town",
                telephone: "94123456789",
                name: "Temp Test",
            };
            chai.request(app)
                .post("/api/admin/warehouse")
                .send(warehouse)
                .end((err, res) => {
                    res.should.have.status(201);
                    id = res.body.id;
                    expect(res.body).to.be.a("object");
                    expect(res.body.id).to.be.a("string");
                    done();
                });
        });
        after(async () => {
            await warehouseDao.delete(id);
        });

    });

    describe("POST Validation Error admin/warehouse", () => {
        let id: string;
        it("Should give validation error response", (done) => {
            const warehouse = {
                district: "Test district",
                town: "Test Town",
                telephone: "94123456789",
            };
            chai.request(app)
                .post("/api/admin/warehouse")
                .send(warehouse)
                .end((err, res) => {
                    res.should.have.status(401);
                    expect(res.body.message).to.be.a.string("\"name\" is required");
                    done();
                });
        });
        after(async () => {
            if (id) {
                await warehouseDao.delete(id);
            }
        });
    });

    describe("GET admin/warehouse", () => {
        it("Should return all the warehouses", (done) => {
            chai.request(app)
                .get("/api/admin/warehouse?sortBy=+name&limit=-1")
                .end((err, res) => {
                    res.should.have.status(201);
                    expect(res.body.items).to.be.a("array");
                    res.body.items.should.all.have.property("name");
                    res.body.items.should.all.have.property("telephone");
                    res.body.items.should.all.have.property("products");
                    res.body.items.should.all.have.property("town");
                    res.body.items.should.all.have.property("district");
                    done();
                });
        });

    });

    describe("GET  admin/warehouse/:id", () => {
        it("Should return the warehouse to given ID", (done) => {
            chai.request(app)
                .get(`/api/admin/warehouse/${testWarehouse._id}`)
                .end((err, res) => {
                    res.should.have.status(201);
                    expect(res.body.result).to.be.a("object");
                    expect(JSON.parse(JSON.stringify(res.body.result))).to.have.any.keys("name", "telephone", "products", "town", "district");
                    done();
                });
        });
    });


    describe("GET Warehouse Not Found admin/warehouse/:id", () => {
        it("Should return the warehouse to given ID", (done) => {
            chai.request(app)
                .get(`/api/admin/warehouse/123456789`)
                .end((err, res) => {
                    res.should.have.status(422);
                    expect(res.body).to.be.a("object").empty;
                    done();
                });
        });
    });

    describe("PATCH admin/warehouse/:id", () => {
        it("Should Assign given manager to the giver warehouse", (done) => {
            chai.request(app)
                .patch(`/api/admin/warehouse/${testWarehouse._id}`)
                .send({managerId: testUnAssignedManager._id})
                .end((err, res) => {
                    res.should.have.status(201);
                    expect(res.body.success).to.be.equal(1);
                    done();
                });
        });
    });

    describe("PATCH Validation Error admin/warehouse/:id", () => {
        it("Should give validation error response", (done) => {
            chai.request(app)
                .patch(`/api/admin/warehouse/${testWarehouse._id}`)
                .send({manager: testUnAssignedManager._id})
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
    });

    // describe("DELETE admin/warehouse/:id", () => {
    //     it("Should remove manager from the given warehouse", (done) => {
    //         chai.request(app)
    //             .delete(`/api/admin/warehouse/${testWarehouse._id}`)
    //             .end((err, res) => {
    //                 res.should.have.status(201);
    //                 expect(res.body.success).to.be.equal(1);
    //                 done();
    //             });
    //     });
    // });


    describe("GET admin/warehouse/:id/analytics", () => {
        it("Should return the  analytics of the given warehouse ID", (done) => {
            chai.request(app)
                .get(`/api/admin/warehouse/${testWarehouse._id}/analytics`)
                .end((err, res) => {
                    res.should.have.status(201);
                    expect(res.body).to.be.a("object");
                    Object.values(res.body).should.all.have.property("totalIncome");
                    done();
                });
        });
    });


    after(async () => {
        await categoryDAO.delete(testCategory._id);
        await productDao.delete(testProduct._id);
        await dailyProductsDAO.delete(testDailyProduct._id)
        await userDao.delete(testUnAssignedManager._id);
        await userDao.delete(testSalesperson._id);
        await warehouseDao.delete(testWarehouse._id);
    });
});
