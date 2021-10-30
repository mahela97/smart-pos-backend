import chai from "chai";
import { expect } from 'chai';
import {ShopDocument} from "../../src/schemaModels/shop.model";
import ShopDAO from "../../src/dao/shopDAO";

chai.should();

describe("ShopDAO Unit Testings", () => {

    const shopDAO = new ShopDAO();

    describe("Check Add Shop", () => {
        let shop: ShopDocument;
        it("Should have property: id", async () => {
            shop = await shopDAO.add({
                "name": "Dilshan Stores",
                "email": "dilshan@gmail.com",
                "telephone": "0779667936",
                "location": "Gampaha",
                "longitude": "7.409",
                "latitude": "80.098",
                "ownerName": "Dilshan",
                "address": "245/4, Batapotha, Gampaha",
                "warehouse": "61364110017b454634bf0b99"

            })
            expect(shop).to.have.property("id");
        })
        after(async () => {
            await shopDAO.delete(shop._id);
        })
    })

    describe("Check Get All shops", () => {
        let shopArray: Record<string, any>
        before(async () => {
            await shopDAO.add({
                "name": "Test Stores1",
                "email": "test1@gmail.com",
                "telephone": "0779667936",
                "location": "Gampaha",
                "longitude": "7.409",
                "latitude": "80.098",
                "ownerName": "Test1",
                "address": "245/4, Batapotha, Gampaha",
                "warehouse": "61364110017b454634bf0b99"})
            await shopDAO.add({
                "name": "Test Stores2",
                "email": "test2@gmail.com",
                "telephone": "0779667933",
                "location": "Gampaha",
                "longitude": "7.609",
                "latitude": "80.098",
                "ownerName": "Test2",
                "address": "245/5, Batapotha, Gampaha",
                "warehouse": "61364110017b454634bf0b99"})
        })
        it("should return all shops", async () => {
            shopArray = await shopDAO.getAll({sortBy: ' name', query: '', page: 1, limit: 10, filter: ''});
            expect(shopArray.total).to.eql(2);
            expect(shopArray.items).to.be.a("array");
        })

        after(()=>{
            shopArray.items.map(async (shop: any) => {
                await shopDAO.delete(shop._id);
            })
        })
    })

    describe("Check Get All Warehouse Shops", () => {
        let shopArray: Record<string, any>
        before(async () => {
            await shopDAO.add({
                "name": "Test Stores1",
                "email": "test1@gmail.com",
                "telephone": "0779667936",
                "location": "Gampaha",
                "longitude": "7.409",
                "latitude": "80.098",
                "ownerName": "Test1",
                "address": "245/4, Batapotha, Gampaha",
                "warehouse": "61364110017b454634bf0b99"})
            await shopDAO.add({
                "name": "Test Stores2",
                "email": "test2@gmail.com",
                "telephone": "0779667933",
                "location": "Gampaha",
                "longitude": "7.609",
                "latitude": "80.098",
                "ownerName": "Test2",
                "address": "245/5, Batapotha, Gampaha",
                "warehouse": "61364110017b454634bf0b99"})
        })
        it("should return all warehouse shops", async () => {
            shopArray = await shopDAO.getAllWarehouseShops("61364110017b454634bf0b99",{ sortBy: ' name', query: '', page: 1, limit: 100, filter: '' }
            );
            expect(shopArray.total).to.eql(2);
            expect(shopArray.items).to.be.a("array");
        })

        after(()=>{
            shopArray.items.map(async (shop: any) => {
                await shopDAO.delete(shop._id);
            })
        })
    })


    describe("Check Get One Shop", () => {
        let shop: ShopDocument;
        let testShop: ShopDocument;
        before(async () => {
            testShop = await shopDAO.add({
                "name": "Test Stores",
                "email": "dilshan@gmail.com",
                "telephone": "0779667936",
                "location": "Gampaha",
                "longitude": "7.409",
                "latitude": "80.098",
                "ownerName": "Dilshan",
                "address": "245/4, Batapotha, Gampaha",
                "warehouse": "61364110017b454634bf0b99"

            })
        })
        it("should return one shop", async ()=> {
            shop = await shopDAO.getOneShop(testShop._id);
            expect(shop).to.have.property("_id");
            await shopDAO.delete(testShop._id);
        })
    })



})