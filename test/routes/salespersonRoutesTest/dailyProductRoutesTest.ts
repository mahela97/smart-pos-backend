import chai, {expect} from "chai";
import chaiHttp from "chai-http";
import app from "../../../src";
import chaiThings from "chai-things";
import DailyProductsDAO from "../../../src/dao/dailyProductsDAO";
import SalespersonShopsDAO from "../../../src/dao/salespersonShopsDAO";
import WarehouseDAO from "../../../src/dao/warehouseDAO";
import ProductDAO from "../../../src/dao/productDAO";
import {ProductDocument} from "../../../src/schemaModels/product.model";
import {WarehouseDocument} from "../../../src/schemaModels/warehouse.model";
import {DailyProductDocument} from "../../../src/schemaModels/dailyProduct.model";
import {UserDocument} from "../../../src/schemaModels/user.model";

chai.should();
chai.use(chaiHttp);
chai.use(chaiThings);

describe("/salesperson/dailyProducts Routes Integration Tests", () => {
    const dailyProductsDao = new DailyProductsDAO();
    const salespersonDao = new SalespersonShopsDAO();
    const warehouseDao = new WarehouseDAO();
    const productDao = new ProductDAO();
    let testProduct1: ProductDocument;
    let testProduct2: ProductDocument;
    let testWarehouse: WarehouseDocument
    let testDailyProducts: DailyProductDocument;
    let testSalesperson: UserDocument;
    before(async () => {
        testProduct1 = await productDao.add({
            "name":"Test Product 1",
            "categoryId":"61376bb281690d04c4b8a35e",
            "unitPrice": 100.75,
            "description":"test 1",
            "photo":"https://objectstorage.ap-mumbai-1.oraclecloud.com/n/softlogicbicloud/b/cdn/o/products/114806--01--1623926478.jpeg"
        })
        testProduct2 = await productDao.add({
            "name":"Test Product 2",
            "categoryId":"61376bb281690d04c4b8a35e",
            "unitPrice": 100.75,
            "description":"test 1",
            "photo":"https://objectstorage.ap-mumbai-1.oraclecloud.com/n/softlogicbicloud/b/cdn/o/products/114806--01--1623926478.jpeg"
        })
        testWarehouse = await warehouseDao.add({
            name: "Test warehouse",
            telephone: "11111111111",
            district: "Test District",
            town: "Test Town",
        });
        testSalesperson = await salespersonDao.add({
            firstName: "Test",
            uid: "uid",
            archived: false,
            lastName: "Salesperson",
            telephone: "0779667935",
            email: "testSalesperson@gmail.com",
            role: "salesperson",
            warehouseId: testWarehouse._id,
        })
        testDailyProducts = await dailyProductsDao.add({
            "salesperson": testSalesperson._id,
            "dailyProducts": [
                {
                    "product": testProduct1._id,
                    "quantity": 150,
                    "sales": 0
                },
                {
                    "product": testProduct2._id,
                    "quantity": 200,
                    "sales": 0
                },
            ]
        })
    })
    describe("GET  /salesperson/dailyProducts/:id", () => {
        it("Should return the dailyProducts to given salesperson ID", (done) => {
            chai.request(app)
                .get(`/api//salesperson/dailyProducts/${testSalesperson._id}`)
                .end((err, res) => {
                    res.should.have.status(201);
                    expect(res.body.result).to.be.a("object");
                    expect(JSON.parse(JSON.stringify(res.body.result))).to.have.any.keys("dailyProducts", "salesperson");
                    done();
                });
        });
    });

    after(async () => {
        await dailyProductsDao.delete(testDailyProducts._id);
        await salespersonDao.delete(testSalesperson._id);
        await warehouseDao.delete(testWarehouse._id);
        await productDao.delete(testProduct1._id);
        await productDao.delete(testProduct2._id);
    })
})