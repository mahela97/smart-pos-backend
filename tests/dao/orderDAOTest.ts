import OrderDAO from "../../src/dao/orderDAO";
import chai from "chai";
import { expect } from 'chai';
import {OrderDocument} from "../../src/schemaModels/order.model";
import ShopDAO from "../../src/dao/shopDAO";
import {ShopDocument} from "../../src/schemaModels/shop.model";

chai.should();


describe('OrderDAO Unit Testings', () => { // the tests container

    const orderDAO = new OrderDAO();
    const shopDAO = new ShopDAO();
    let ordersOfOneShop: Record<string, any>

    let shop: ShopDocument;
    let ordersOfOneSalesperson: Record<string, any>
    before(async () => {
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
        await orderDAO.add({
            "products": [
                {
                    "product": "6144d5c14a0ae6415805b439",
                    "quantity": 10
                },
                {
                    "product": "6144d5d44a0ae6415805b43b",
                    "quantity": 15
                }
            ],
            "shop": "61366f2747ecc3419cad28fc",
            "salesperson": "61364263017b454634bf0b9b",
            "totalPrice": 2000,
            "receivedPrice": 1245
        })
        await orderDAO.add({
            "products": [
                {
                    "product": "6144d5c14a0ae6415805b439",
                    "quantity": 30
                },
                {
                    "product": "6144d5d44a0ae6415805b43b",
                    "quantity": 15
                }
            ],
            "shop": "61366f2747ecc3419cad28fc",
            "salesperson": "61364263017b454634bf0b9b",
            "totalPrice": 3000,
            "receivedPrice": 1245
        })

    });
    describe("Check Add Order", () => {
        let testOrder: OrderDocument;
        before(async () => {
                testOrder = await orderDAO.add({
                "products": [
                    {
                        "product": "6144d5c14a0ae6415805b439",
                        "quantity": 10
                    },
                    {
                        "product": "6144d5d44a0ae6415805b43b",
                        "quantity": 15
                    }
                ],
                "shop": "61366f2747ecc3419cad28fc",
                "salesperson": "61364263017b454634bf0b9b",
                "totalPrice": 2000,
                "receivedPrice": 1245
            });
        })
        it("Should have property: id", () => {
            expect(testOrder).to.have.property("id");
        })
        after(async () => {
            await orderDAO.delete(testOrder._id);
        })
    })

    describe("Check Get All Orders Of One Shop", () => {
        it("should return all orders of one shop", async () => {
            ordersOfOneShop = await orderDAO.getOrdersOfOneShop("61366f2747ecc3419cad28fc");
            expect(ordersOfOneShop).length(2);
        })
        after(async () => {

        });
    })

    describe("Check Get All Orders Of One Salesperson", () => {
        it("should return all orders of one salesperson", async () => {
            ordersOfOneSalesperson = await orderDAO.getAllOrdersOfOneSalesperson({ sortBy: ' createdAt', query: '', page: 1, filter: '' }
                ,"61364263017b454634bf0b9b")
            expect(ordersOfOneSalesperson).length(2);
        })
    })

    after(async () => {
        ordersOfOneShop.map(async (order:any) => {
            await orderDAO.delete(order._id);
        })
        await shopDAO.delete(shop._id)
    })

});