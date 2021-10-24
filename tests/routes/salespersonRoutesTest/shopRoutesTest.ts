import chai, {expect} from "chai";
import chaiHttp from "chai-http";
import app from "../../../src/index";
import chaiThings from "chai-things";
import ShopDAO from "../../../src/dao/shopDAO";
import {ShopDocument} from "../../../src/schemaModels/shop.model";

chai.should();
chai.use(chaiHttp);
chai.use(chaiThings);

describe("/salesperson/shop Routes Integration Tests", () => {
    const shopDao = new ShopDAO();
    let testShop: ShopDocument;
    before(async () => {
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
        })
    })

    describe("POST salesperson/shop", () => {
        let id: string;
        it("Should add new shop", (done) => {
            const shop = {
                "name": "Test Stores",
                "email": "test@gmail.com",
                "telephone": "0779667936",
                "location": "Gampaha",
                "longitude": "7.409",
                "latitude": "80.098",
                "ownerName": "Test",
                "address": "245/4, Batapotha, Gampaha",
                "warehouse": "61364110017b454634bf0b99"
            };
            chai.request(app).post("/api/salesperson/shop").send(shop).end((err, res) => {
                res.should.have.status(201);
                id = res.body.id;
                expect(res.body).to.be.a("object");
                expect(res.body.id).to.be.a("string");
                done();
            })
        })
        after(async () => {
            await shopDao.delete(id);
        })
    })

    describe("POST Validation Error salesperson/shop", () => {
        let id: string;
        it("Should give validation error response", (done) => {
            const shop = {
                "email": "test@gmail.com",
                "telephone": "0779667936",
                "location": "Gampaha",
                "longitude": "7.409",
                "latitude": "80.098",
                "ownerName": "Dilshan",
                "address": "245/4, Batapotha, Gampaha",
                "warehouse": "61364110017b454634bf0b99"
            };
            chai.request(app)
                .post("/api/salesperson/shop")
                .send(shop)
                .end((err, res) => {
                    res.should.have.status(401);
                    expect(res.body.message).to.be.a.string("\"name\" is required");
                    done();
                });
        });
        after(async () => {
            if (id) {
                await shopDao.delete(id);
            }
        });
    });

    describe("GET salesperson/shop", () => {
        it("Should return all the shops", (done) => {
            chai.request(app)
                .get("/api/salesperson/shop?sortBy=+name")
                .end((err, res) => {
                    res.should.have.status(201);
                    expect(res.body.items).to.be.a("array");
                    res.body.items.should.all.have.property("name");
                    res.body.items.should.all.have.property("telephone");
                    res.body.items.should.all.have.property("email");
                    res.body.items.should.all.have.property("location");
                    res.body.items.should.all.have.property("ownerName");
                    done();
                });
        });

    });

    describe("GET  salesperson/shop/:id", () => {
        it("Should return the shop to given ID", (done) => {
            chai.request(app)
                .get(`/api/salesperson/shop/${testShop._id}`)
                .end((err, res) => {
                    res.should.have.status(201);
                    expect(res.body.result).to.be.a("object");
                    expect(JSON.parse(JSON.stringify(res.body.result))).to.have.any.keys("name", "telephone", "email", "location", "ownerName");
                    done();
                });
        });
    });

    after(async ()=> {
        await shopDao.delete(testShop._id);
    })

})