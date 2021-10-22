import chai from "chai";
import { expect } from 'chai';
import ProductDAO from "../../src/dao/productDAO";
import CategoryDAO from "../../src/dao/categoryDAO";
import {CategoryDocument} from "../../src/schemaModels/category.model";
import {ProductDocument} from "../../src/schemaModels/product.model";

chai.should();

describe("ProductDAO Unit Testing", () => {
    const productDAO = new ProductDAO();
    const categoryDAO = new CategoryDAO();
    let category: CategoryDocument
    before(async () => {
        category = await categoryDAO.add({ name: "Test Category One" });
    })
    describe("Check Add Product", () => {
        let product: ProductDocument;
        it("Should have property id", async () => {
            product = await productDAO.add({
                "name":"Test Product",
                "categoryId": category._id,
                "unitPrice": 100.75,
                "description":"test description",
                "photo":"https://objectstorage.ap-mumbai-1.oraclecloud.com/n/softlogicbicloud/b/cdn/o/products/114806--01--1623926478.jpeg"
            })
            expect(product).to.be.a("object");
            expect(product).to.have.property("categoryId");
        })
        after(async () => {
            await productDAO.delete(product._id);
        })
    })

    describe("Check Get One Product", () => {
        let product: ProductDocument;
        let testProduct: ProductDocument;
        before(async () => {
            testProduct = await productDAO.add({
                "name":"Test Product",
                "categoryId": category._id,
                "unitPrice": 100.75,
                "description":"test description",
                "photo":"https://objectstorage.ap-mumbai-1.oraclecloud.com/n/softlogicbicloud/b/cdn/o/products/114806--01--1623926478.jpeg"
            })
        })
        it("Should return one product", async () => {
            product = await productDAO.getOneProduct(testProduct._id);
            expect(product).to.be.a("object");
            expect(product).to.have.property("_id");
        })
        after(async () => {
            await productDAO.delete(testProduct._id);
        })
    })

    describe("Check Get All Products", () => {
        let productArray: Record<string, any>
        before(async () => {
            await productDAO.add({
                "name":"Test Product1",
                "categoryId": category._id,
                "unitPrice": 100.75,
                "description":"test description1",
                "photo":"https://objectstorage.ap-mumbai-1.oraclecloud.com/n/softlogicbicloud/b/cdn/o/products/114806--01--1623926478.jpeg"
            })
            await productDAO.add({
                "name":"Test Product2",
                "categoryId": category._id,
                "unitPrice": 100.75,
                "description":"test description2",
                "photo":"https://objectstorage.ap-mumbai-1.oraclecloud.com/n/softlogicbicloud/b/cdn/o/products/114806--01--1623926478.jpeg"
            })
        })
        it("Should return all products", async () => {
            productArray = await productDAO.getAll({ sortBy: ' name', query: '', page: 1, limit: 100, filter: '' })
            expect(productArray.total).to.eql(2);
            expect(productArray.items).to.be.a("array");
        })
        after(()=>{
            productArray.items.map(async (product: any) => {
                await productDAO.delete(product._id);
            })
        })
    })


    after(() => {
        categoryDAO.delete(category._id);
    })
})