import chai, {expect} from "chai";
import chaiHttp from "chai-http";
import app from "../../../src";
import chaiThings from "chai-things";
import LeaveDAO from "../../../src/dao/leaveDAO";
import {LeaveDocument} from "../../../src/schemaModels/leave.model";

chai.should();
chai.use(chaiHttp);
chai.use(chaiThings);

describe("/salesperson/leave Routes Integration Testing", () => {
    let testLeave: LeaveDocument;
    const leaveDao = new LeaveDAO();
    before(async () => {
        testLeave = await leaveDao.add({
            "userId": "6169ddf7ecde041eece94d2d",
            "description": "Test Description",
            "approved": "pending",
            "from": "2021/09/09",
            "to": "2021/09/11"
        })
    })
    describe("POST salesperson/leave", () => {
        let id: string;
        it("Should add new leave", (done) => {
            const leave = {
                "userId": "6169ddf7ecde041eece94d1d",
                "description": "Test Description1",
                "approved": "pending",
                "from": "2021/09/09",
                "to": "2021/09/11"
            }
            chai.request(app)
                .post("/api/salesperson/leave")
                .send(leave)
                .end((err, res) => {
                    res.should.have.status(201);
                    id = res.body.id;
                    expect(res.body).to.be.a("object");
                    expect(res.body.id).to.be.a("string");
                    done();
                });
        });

        describe("GET salesperson/leave/:id", () => {
            it("Should return all the leaves to given Salesperson ID", (done) => {
                chai.request(app)
                    .get("/api/salesperson/leave/6169ddf7ecde041eece94d2d?sortBy=+name")
                    .end((err, res) => {
                        res.should.have.status(201);
                        expect(res.body.items).to.be.a("array");
                        res.body.items.should.all.have.property("description");
                        res.body.items.should.all.have.property("approved");
                        res.body.items.should.all.have.property("from");
                        res.body.items.should.all.have.property("to");
                        done();
                    });
            });

        });

        after(async () => {
            await leaveDao.delete(id);
        });
    })
    after(async () => {
        await leaveDao.delete(testLeave._id);
    });
})