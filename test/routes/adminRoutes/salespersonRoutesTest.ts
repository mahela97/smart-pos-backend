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
            createdAt: moment().subtract("days",2),
        });

    });

    describe("GET admin/salespersons", () => {
        it("Should return all the salespersons", (done) => {
            chai.request(app)
                .get("/api/admin/salespersons?sortBy=+firstName&limit=-1")
                .end((err, res) => {
                    res.should.have.status(201);
                    expect(res.body.items).to.be.a("array");
                    res.body.items.should.all.have.property("firstName");
                    res.body.items.should.all.have.property("lastName");
                    res.body.items.should.all.have.property("uid");
                    res.body.items.should.all.have.property("role");
                    expect(res.body.items.map((e: { role: any; }) => (e.role))).to.include("salesperson");
                    res.body.items.should.all.have.property("telephone");
                    done();
                });
        });

    });

    describe("GET  admin/salespersons/:id", () => {
        it("Should return the salesperson to given ID", (done) => {
            chai.request(app)
                .get(`/api/admin/salespersons/${testSalesperson._id}`)
                .end((err, res) => {
                    res.should.have.status(201);
                    expect(res.body.result).to.be.a("object");
                    expect(JSON.parse(JSON.stringify(res.body.result))).to.have.any.keys("firstname", "uid", "lastName", "email", "role");
                    expect(JSON.parse(JSON.stringify(res.body.result.role))).to.be.equal("salesperson");
                    done();
                });
        });
    });

    describe("GET User Not Found admin/salespersons/:id", () => {
        it("Should give not found error response", (done) => {
            chai.request(app)
                .get(`/api/admin/salespersons/123456789`)
                .end((err, res) => {
                    res.should.have.status(422);
                    expect(res.body).to.be.a("object").empty;
                    done();
                });
        });
    });

    describe("GET admin/salespersons/analyticsByIncome-range", () => {
        it("Should give all salespersons analytics by income", (done) => {
            chai.request(app)
                .get(`/api/admin/salespersons/analyticsByIncome-range`)
                .end((err, res) => {
                    res.should.have.status(201);
                    expect(res.body).to.be.a("object");
                    expect(res.body.incomes).to.be.a("array")
                    res.body.incomes.should.all.have.property("income");
                    done();
                });
        });
    });

    describe("GET admin/salespersons/:id/analytics/products/range", () => {
        it("Should return analytics and sale products", (done) => {
            chai.request(app)
                .get(`/api/admin/salespersons/${testSalesperson._id}/analytics/products/range`)
                .end((err, res) => {
                    res.should.have.status(201);
                    expect(res.body).to.be.a("object");
                    done();
                });
        });
    });

    describe("GET Unprocessed Entity admin/salespersons/:id/analytics/products/range", () => {
        it("Should Give 422 error", (done) => {
            chai.request(app)
                .get(`/api/admin/salespersons/id/analytics/products/range`)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });
    });


    describe("GET admin/salespersons/:id/analytics/sales/range", () => {
        it("Should return analytics of sales", (done) => {
            chai.request(app)
                .get(`/api/admin/salespersons/${testSalesperson._id}/analytics/sales/range`)
                .end((err, res) => {
                    res.should.have.status(201);
                    expect(res.body).to.be.a("object");
                    done();
                });
        });
    });


    describe("GET Unprocessed Entity admin/salespersons/:id/analytics/sales/range", () => {
        it("Should Give 422 error", (done) => {
            chai.request(app)
                .get(`/api/admin/salespersons/id/analytics/sales/range`)
                .end((err, res) => {
                    res.should.have.status(422);
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
