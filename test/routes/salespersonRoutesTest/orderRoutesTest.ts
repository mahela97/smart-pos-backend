import chai, {expect} from "chai";
import chaiHttp from "chai-http";
import app from "../../../src";
import chaiThings from "chai-things";
import DailyProductsDAO from "../../../src/dao/dailyProductsDAO";

import SalespersonShopsDAO from "../../../src/dao/salespersonShopsDAO";
import {UserDocument} from "../../../src/schemaModels/user.model";
import WarehouseDAO from "../../../src/dao/warehouseDAO";
import {WarehouseDocument} from "../../../src/schemaModels/warehouse.model";
import ShopDAO from "../../../src/dao/shopDAO";
import {ShopDocument} from "../../../src/schemaModels/shop.model";
import ProductDAO from "../../../src/dao/productDAO";
import {ProductDocument} from "../../../src/schemaModels/product.model";
import {DailyProductDocument} from "../../../src/schemaModels/dailyProduct.model";
import {OrderDocument} from "../../../src/schemaModels/order.model";
import OrderDAO from "../../../src/dao/orderDAO";


chai.should();
chai.use(chaiHttp);
chai.use(chaiThings);

describe("/salesperson/order Routes Integration Tests", () => {
    const dailyProductsDao = new DailyProductsDAO();
    const salespersonDao = new SalespersonShopsDAO();
    const warehouseDao = new WarehouseDAO();
    const productDao = new ProductDAO();
    const shopDao = new ShopDAO();
    const orderDao = new OrderDAO();
    let testShop: ShopDocument;
    let testProduct1: ProductDocument;
    let testProduct2: ProductDocument;
    let testWarehouse: WarehouseDocument
    let testDailyProducts: DailyProductDocument;
    let testSalesperson: UserDocument;
    let testOrder: OrderDocument;
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
        testShop = await shopDao.add({
            "name": "Test1 Stores",
            "email": "test1@gmail.com",
            "telephone": "0779667936",
            "location": "Gampaha",
            "longitude": "7.409",
            "latitude": "80.098",
            "ownerName": "Test1",
            "address": "245/4, Batapotha, Gampaha",
            "warehouse": "61364110017b454634bf0b99"
        });
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
        testOrder = await orderDao.add({
            "products": [
                {
                    "product": testProduct1._id,
                    "quantity": 5
                },
                {
                    "product": testProduct2._id,
                    "quantity": 6
                }
            ],
            "shop": testShop._id,
            "salesperson": testSalesperson._id,
            "totalPrice": 2000,
            "receivedPrice": 1245
        })
    })
    describe("POST salesperson/ordersOfOneShop", () => {
        it("Should add new order", (done) => {
            const order = {
                "products": [
                    {
                        "product": testProduct1._id,
                        "quantity": 10
                    },
                    {
                        "product": testProduct2._id,
                        "quantity": 15
                    }
                ],
                "shop": testShop._id,
                "salesperson": testSalesperson._id,
                "totalPrice": 2000,
                "receivedPrice": 1245
            }
            chai.request(app)
                .post("/api/salesperson/order")
                .send(order)
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        })
    })
    describe("GET salesperson/ordersOfOneShop/:id", () => {
        it("Should return all orders to given shop ID", (done) => {
            chai.request(app)
                .get(`/api/salesperson/ordersOfOneShop/${testShop._id}`)
                .end((err, res) => {
                    res.should.have.status(201);
                    expect(res.body.result).to.be.a("array");
                    res.body.result.should.all.have.property("products");
                    res.body.result.should.all.have.property("shop");
                    res.body.result.should.all.have.property("salesperson");
                    res.body.result.should.all.have.property("totalPrice");
                    res.body.result.should.all.have.property("receivedPrice");
                    done();
                });
        });

    });
    describe("GET salesperson/ordersOfOneSalesperson/:id", () => {
        it("Should return all orders to given salesperson ID", (done) => {
            chai.request(app)
                .get(`/api/salesperson/ordersOfOneSalesperson/${testSalesperson._id}?sortBy=+createdAt`)
                .end((err, res) => {
                    res.should.have.status(201);
                    expect(res.body.result).to.be.a("array");
                    res.body.result.should.all.have.property("products");
                    res.body.result.should.all.have.property("shop");
                    res.body.result.should.all.have.property("salesperson");
                    res.body.result.should.all.have.property("totalPrice");
                    res.body.result.should.all.have.property("receivedPrice");
                    done();
                });
        });

    });


    after(async () => {
        await orderDao.delete(testOrder._id);
        await dailyProductsDao.delete(testDailyProducts._id);
        await salespersonDao.delete(testSalesperson._id);
        await warehouseDao.delete(testWarehouse._id);
        await shopDao.delete(testShop._id);
        await productDao.delete(testProduct1._id);
        await productDao.delete(testProduct2._id);
    })
})