import UserDAO from "../../src/dao/userDAO";
import chai, {expect} from "chai";
import {UserDocument} from "../../src/schemaModels/user.model";
import {WarehouseDocument} from "../../src/schemaModels/warehouse.model";
import WarehouseDAO from "../../src/dao/warehouseDAO";
import chaiThings from "chai-things";
import {ProductDocument} from "../../src/schemaModels/product.model";
import ProductDAO from "../../src/dao/productDAO";
import CategoryDAO from "../../src/dao/categoryDAO";
import {CategoryDocument} from "../../src/schemaModels/category.model";


chai.should();
chai.use(chaiThings);

describe("WarehouseDao Unit Testings", () => {
    const userDao = new UserDAO();
    const warehouseDao = new WarehouseDAO();
    const productDao = new ProductDAO();
    const categoryDAO = new CategoryDAO();
    let testManager: UserDocument;
    let testWarehouse: WarehouseDocument;
    let testProduct: ProductDocument;
    let testCategory: CategoryDocument;
    before(async () => {
        testManager = await userDao.add({
            firstName: "Test",
            uid: "123456789",
            archived: false,
            lastName: "User",
            telephone: "0779667935",
            email: "testUser@gmail.com",
            role: "manager",
        });
        testWarehouse = await warehouseDao.add({
            name: "Test warehouse",
            telephone: "11111111111",
            district: "Test District",
            town: "Test Town",
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
    });

    describe("Get all warehouses", () => {
        let warehouses: Record<string, any>;
        it("Should return all warehouses", async () => {
            warehouses = await warehouseDao.getAll({
                query: "",
                sortBy: "+firstName",
                limit: -1,
                filter: "archived eq false"
            });
            JSON.parse(JSON.stringify(warehouses.items)).should.all.have.property("name");
            warehouses.items.should.all.have.property("telephone");
            warehouses.items.should.all.have.property("town");
            warehouses.items.should.all.have.property("district");
        });
    });

    describe("Get Warehouse By ID", () => {
        let warehouse: WarehouseDocument;
        it("Should return warehouse matching to the ID", async () => {
            warehouse = await warehouseDao.getOneWarehouse(testWarehouse._id);
            expect(warehouse).to.be.a("object");
            expect(JSON.parse(JSON.stringify(warehouse))).to.have.any.keys("name", "telephone", "products", "district", "town");
        });
    });

    describe("Assign manager to the warehouse", () => {
        let warehouse: WarehouseDocument;
        it("Should assign a manager to the given warehouse", async () => {
            await warehouseDao.assignManager(testManager._id, testWarehouse._id);
            warehouse = await warehouseDao.getOneWarehouse(testWarehouse._id);
            expect(warehouse).to.be.a("object");
            expect(JSON.parse(JSON.stringify(warehouse))).to.have.any.keys("name", "telephone", "products", "district", "town", "managerId");
            expect(warehouse.managerId).to.be.a("object");
            expect(JSON.parse(JSON.stringify(warehouse.managerId))).to.have.any.keys("firstname", "uid", "lastName", "email", "role");
        });
        after(async () => {
            await warehouseDao.update({$unset: {managerId: 1}}, testWarehouse._id);
        });
    });

    describe("Add product to warehouse",()=>{
        let warehouse:WarehouseDocument;
        it("Should add product to the given warehouse",async ()=>{
            await warehouseDao.addWarehouseProduct(testWarehouse._id,{product:testProduct._id,quantity:20});
            warehouse = await warehouseDao.getOneWarehouse(testWarehouse._id);
            expect(warehouse.products).to.be.a("array");
            // @ts-ignore
            warehouse.products.should.all.have.property("product");
            // @ts-ignore
            warehouse.products.should.all.have.property("quantity");
        })
    })

    describe("Delete product in warehouse",()=>{
        before(async()=>{
            await warehouseDao.addWarehouseProduct(testWarehouse._id,{product:testProduct._id,quantity:20});
        })
        let warehouse:WarehouseDocument;
        it("Should add product to the given warehouse",async ()=>{
            await warehouseDao.deleteWarehouseProduct(testWarehouse._id,testProduct._id);
            warehouse = await warehouseDao.getOneWarehouse(testWarehouse._id);
            expect(warehouse.products).to.be.a("array").that.is.empty;
        })
    })

    describe("Get All warehouse products",()=>{
        before(async()=>{
            await warehouseDao.addWarehouseProduct(testWarehouse._id,{product:testProduct._id,quantity:20});
        })
        let warehouse:Partial<WarehouseDocument>;
        it("Should add product to the given warehouse",async ()=>{
            warehouse = await warehouseDao.getAllWarehouseProducts(testWarehouse._id,{query:"",sortBy:"+name"});
            expect(warehouse.products).to.be.a("array");
            // @ts-ignore
            warehouse.products.should.all.have.property("product");
            // @ts-ignore
            warehouse.products.should.all.have.property("quantity");
        })
        after(async()=>{
            await warehouseDao.deleteWarehouseProduct(testWarehouse._id,testProduct._id);
        })
    })


    after(async () => {
        await userDao.delete(testManager._id);
        await warehouseDao.delete(testWarehouse._id);
        await categoryDAO.delete(testCategory._id);
        await productDao.delete(testProduct._id);
    });
});