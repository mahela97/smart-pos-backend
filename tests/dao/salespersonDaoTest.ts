import chai, {expect} from "chai";
import chaiThings from "chai-things";
import {UserDocument} from "../../src/schemaModels/user.model";
import UserDAO from "../../src/dao/userDAO";
import ShopDAO from "../../src/dao/shopDAO";
import {ShopDocument} from "../../src/schemaModels/shop.model";
import {WarehouseDocument} from "../../src/schemaModels/warehouse.model";
import WarehouseDAO from "../../src/dao/warehouseDAO";
import SalespersonShopsDAO from "../../src/dao/salespersonShopsDAO";
import {SalespersonShopDocument} from "../../src/schemaModels/salespersonShop.model";


chai.should();
chai.use(chaiThings);

describe("SalespersonShopDao Unit Testing", () => {
    const userDao = new UserDAO();
    const shopDao = new ShopDAO();
    const warehouseDao = new WarehouseDAO();
    const salespersonShopDao = new SalespersonShopsDAO();
    let testSalespersonShop :SalespersonShopDocument;
    let testSalesperson: UserDocument;
    let testShop: ShopDocument;
    let testWarehouse:WarehouseDocument;
    before(async () => {
        testSalesperson = await userDao.add({
            firstName: "Test",
            uid: "123456789",
            archived: false,
            lastName: "Salesperson",
            telephone: "0779667935",
            email: "testSalesperson@gmail.com",
            role: "salesperson",
        });
        testShop = await shopDao.add(
            {
                name: "Test Store",
                email: "testStore@gmail.com",
                telephone: "0779667936",
                location: "Test Location",
                longitude: "7.409",
                latitude: "80.098",
                ownerName: "Test owner",
                address: "Test address",
                warehouse: "61364110017b454634bf0b99"
            }
        );
        testWarehouse = await warehouseDao.add({
            name: "Test warehouse",
            telephone: "11111111111",
            district: "Test District",
            town: "Test Town",
        });
        testSalespersonShop = await salespersonShopDao.add({
            salespersonId:testSalesperson._id,
            shops:[testShop._id]
        })
    });

    describe("Get One Salesperson Shops",()=>{
        let salespersonShop:SalespersonShopDocument;
        it("Should return the shops of salesperson",async()=>{
                salespersonShop = await salespersonShopDao.getOneSalespersonShops(testSalesperson._id)
            expect(salespersonShop).to.be.a("object");
            expect(salespersonShop.shops).to.be.a("array");
            salespersonShop.shops.should.all.have.property("name");
            salespersonShop.shops.should.all.have.property("email");
            salespersonShop.shops.should.all.have.property("warehouse");
            salespersonShop.shops.should.all.have.property("ownerName");
            salespersonShop.shops.should.all.have.property("location");
        })
    })


    after(async()=>{
        await userDao.delete(testSalesperson._id);
        await shopDao.delete(testShop._id);
        await warehouseDao.delete(testWarehouse._id);
        await salespersonShopDao.delete(testSalespersonShop._id);
    })
});