import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../../src/index";
import chaiThings from "chai-things";

chai.should();
chai.use(chaiHttp);
chai.use(chaiThings);

describe("/salesperson/shop Routes Integration Tests", () => {
    describe("POST salesperson/shop", () => {
        it("Should add new shop", (done) => {
            const shop = {
                "name": "Test Stores",
                "email": "test@gmail.com",
                "telephone": "0779667936",
                "location": "Gampaha",
                "longitude": "7.409",
                "latitude": "80.098",
                "ownerName": "Dilshan",
                "address": "245/4, Batapotha, Gampaha",
                "warehouse": "61364110017b454634bf0b99"
            };
            chai.request(app).post("/api/salesperson/shop").send(shop).end((err, res) => {
                res.should.have.status(201);
                done();
            })
        })
        after(async () => {

        })
    })
})