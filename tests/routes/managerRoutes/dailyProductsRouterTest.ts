// import chai from "chai";
// import chaiHttp from "chai-http";
// import app from "../../../src/index";
// import DailyProductsDAO from "../../../src/dao/dailyProductsDAO";
// import chaiThings from "chai-things";
// chai.should();
// chai.use(chaiHttp);
// chai.use(chaiThings);
//
// describe("DailyProducts Routes Tests", () => {
//   let dailyProductsDAO: DailyProductsDAO;
//   before(() => {
//     dailyProductsDAO = new DailyProductsDAO();
//   });
//   describe("POST /api/manager/dailyProducts/:id", () => {
//     const warehouseID = '';
//     it("It should add new category", (done) => {
//       const testDailyproducts = {
//         createdAt: "2021-09-23T19:08:44.274Z",
//         salesperson: "6146b7385db97426a4460138",
//         dailyProducts: [
//           {
//             product: "6144d5c14a0ae6415805b439",
//             quantity: 150,
//             sales: 0,
//           },
//           {
//             product: "6144d5d44a0ae6415805b43b",
//             quantity: 200,
//             sales: 0,
//           },
//         ],
//       };
//       chai
//         .request(app)
//         .post(`/api/manager/dailyProducts/${id}`)
//         .send(testDailyproducts)
//         .end((err, res) => {
//           res.should.have.status(201);
//           res.body.should.have.a("object");
//           res.body.should.have.property("id");
//           id = res.body.id;
//           done();
//         });
//     });
//     after(async () => {
//       await dailyProductsDAO.delete(id);
//     });
//   });
// });
