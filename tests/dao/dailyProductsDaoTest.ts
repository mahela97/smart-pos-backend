import chai from "chai";
import DailyProductsDAO from "../../src/dao/dailyProductsDAO";
// import DailyProductModel from "../../src/models/dailyProductModel";
import moment from "moment";
import ProductDAO from "../../src/dao/productDAO";
import ProductModel from "../../src/models/productModel";
import CategoryDAO from "../../src/dao/categoryDAO";
import { expect } from "chai";
import chaiSubset from "chai-subset";
import { DailyProductDocument } from "../../src/schemaModels/dailyProduct.model";
import { UserDocument } from "../../src/schemaModels/user.model";
import UserDAO from "../../src/dao/userDAO";

chai.use(chaiSubset);
chai.should();

describe("DailyProductsDAO Unit Testing", () => {
  const categoryDAO = new CategoryDAO();
  const productDAO = new ProductDAO();
  const userDao = new UserDAO();
  const dailyProductsDAO = new DailyProductsDAO();
  let testUser: UserDocument;
  let testCategory: any;
  let testCategoryId: string;
  let testProductId: string;
  let testProduct: ProductModel;
  let dailyProductsObject: any;
  let dailyProductsObjectID: any;
  const warehouseId: string = "6150c8bc497d385c88837f2a";
  let startDate: moment.Moment;
  let endDate: moment.Moment;
  before(async () => {
    startDate = moment().startOf("day");
    endDate = moment().endOf("day");
    testCategory = { name: "Test Category" };
    testCategoryId = (await categoryDAO.add(testCategory))._id;
    testProduct = {
      name: "Test Product",
      categoryId: testCategoryId,
      unitPrice: 100.75,
      description: "test product",
      photo: "photo",
      archived: false,
    };
    testProductId = (await productDAO.add(testProduct))._id;
    testUser = await userDao.add({
      firstName: "Test",
      uid: "uid",
      archived: false,
      lastName: "Add",
      telephone: "0779667935",
      email: "addUser@gmail.com",
      role: "manager",
      warehouseId: warehouseId,
    });
    dailyProductsObject = {
      dailyProducts: [
        {
          product: testProductId,
          quantity: 10,
          sales: 0,
        },
      ],
      salesperson: testUser._id,
      createdAt: moment(),
    };
  });

  describe("Check Add Daily Products", () => {
    it("Should add daily products to the salesperson successfully", async () => {
      dailyProductsObjectID = await dailyProductsDAO.add(dailyProductsObject);
      expect(dailyProductsObjectID).to.be.a("object");
      expect(dailyProductsObjectID).to.have.property("_id");
    });
  });

  describe("Check Update Daily Products List", () => {
    let newDailyProductsList: any;
    before(() => {
      newDailyProductsList = [
        { product: testProductId, quantity: 10, sales: 5 },
      ];
    });

    it("Should update daily products list successfully", async () => {
      await dailyProductsDAO.updateDailyProducts(
        dailyProductsObjectID._id,
        newDailyProductsList
      );
      const updatedDailyProduct: DailyProductDocument =
        await dailyProductsDAO.getDocumentByObjectId(dailyProductsObjectID._id);

      expect(updatedDailyProduct.dailyProducts).to.be.an("array");
      expect(
        JSON.parse(JSON.stringify(updatedDailyProduct.dailyProducts))
      ).to.containSubset([
        {
          product: testProductId.toString(),
          quantity: 10,
          sales: 5,
        },
      ]);
    });
  });

  describe("Check Get Salespersons Under Date Range", () => {
    it("Should get all salespersons who has dailyProducts under given date range ", async () => {
      const salespersons = await dailyProductsDAO.getSalespersons(
        startDate,
        endDate
      );
      expect(salespersons).to.containSubset([
        { salesperson: { email: testUser.email } },
      ]);
    });
  });

  describe("Check Get Salespersons In A Given Warehouse Under Date Range", () => {
    it("Should get all salespersons who has dailyProducts in a given warehouse under given date range ", async () => {
      const warehouseSalespersons =
        await dailyProductsDAO.getWarehouseSalespersons(
          warehouseId,
          startDate,
          endDate
        );

      expect(
        JSON.parse(JSON.stringify(warehouseSalespersons))
      ).to.containSubset([
        { salesperson: { email: testUser.email, warehouseId } },
      ]);
    });
  });

  describe("Check Get Sales Of A Salesperson By Date Analytics", () => {
    it("Should get sales by date analytics ", async () => {
      const salesAnalytics = await dailyProductsDAO.getSalesByDateAnalytics(
          testUser._id,
          startDate,
          endDate
      );

      expect(salesAnalytics).to.be.an('array');
      expect(salesAnalytics[0]).to.have.property('createdAt')
      expect(salesAnalytics[0]).to.have.property('dailyProducts')
    });
  });

  after(async () => {
    await dailyProductsDAO.delete(dailyProductsObjectID._id);
    await userDao.delete(testUser._id);
    await productDAO.delete(testProductId);
    await categoryDAO.delete(testCategoryId);
  });
});
