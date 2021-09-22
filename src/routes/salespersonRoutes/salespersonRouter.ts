import { Router } from "express";
import AddShopHandler from "../../services/salespersonServices/addShop/addShopHanlder";
import GetAllShopsHandler from "../../services/salespersonServices/getAllShops/getAllShopsHandler";
import AddLeaveHandler from "../../services/salespersonServices/addLeave/addLeaveHandler";
import GetAllLeavesHandler from "../../services/salespersonServices/getAllLeaves/getAllLeavesHandler";
import GetOneShopHandler from "../../services/salespersonServices/getOneShop/getOneShopHandler";
import AddOrderHandler from "../../services/salespersonServices/addOrder/addOrderHandler";
import GetOrdersOfOneShopHandler from "../../services/salespersonServices/getOdersOfOneShop/getOrdersOfOneShopHandler";
import GetDailyProductsHandler from "../../services/salespersonServices/getDailyProducts/getDailyProductsHandler";
import GetAllOrdersOfOneSalespersonHandler from "../../services/salespersonServices/getAllOrdersOfOneSalesperson/getAllOrdersHandler";
import UpdateShopOrderDueAmountHandler from "../../services/salespersonServices/updateShopOrderDueAmount/updateShopOrderDueAmountHandler";

const salespersonRouter = Router();

// Shop
salespersonRouter.route("/shop").post(AddShopHandler.addShop);
salespersonRouter.route("/shop").get(GetAllShopsHandler.getAllShops);
salespersonRouter.route("/shop/:id").get(GetOneShopHandler.getOneShop);

// Leave
salespersonRouter.route("/leave").post(AddLeaveHandler.addLeave);
salespersonRouter.route("/leave/:id").get(GetAllLeavesHandler.getAllLeaves);

// Order
salespersonRouter.route("/order").post(AddOrderHandler.addOrder);
salespersonRouter
  .route("/ordersOfOneShop/:id")
  .get(GetOrdersOfOneShopHandler.getOrderOfShop);

salespersonRouter
  .route("/ordersOfOneSalesperson/:id")
  .get(GetAllOrdersOfOneSalespersonHandler.getAllOrders);

salespersonRouter
  .route("/updateDue/:id")
  .patch(UpdateShopOrderDueAmountHandler.updateShopOrderDueAmount);

// Daily Products
salespersonRouter
  .route("/dailyProducts/:id")
  .get(GetDailyProductsHandler.getDailyProducts);

export default salespersonRouter;
