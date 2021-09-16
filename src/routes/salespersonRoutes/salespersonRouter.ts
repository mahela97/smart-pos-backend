import { Router } from "express";
import AddShopHandler from "../../services/salespersonServices/addShop/addShopHanlder";
import GetAllShopsHandler from "../../services/salespersonServices/getAllShops/getAllShopsHandler";
import AddLeaveHandler from "../../services/salespersonServices/addLeave/addLeaveHandler";
import GetAllLeavesHandler from "../../services/salespersonServices/getAllLeaves/getAllLeavesHandler";
import GetOneShopHandler from "../../services/salespersonServices/getOneShop/getOneShopHandler";

const salespersonRouter = Router();

// Shop
salespersonRouter.route("/shop").post(AddShopHandler.addShop);
salespersonRouter.route("/shop").get(GetAllShopsHandler.getAllShops);
salespersonRouter.route("/shop/:id").get(GetOneShopHandler.getOneShop);

// Leave
console.log("gg");
salespersonRouter.route("/leave").post(AddLeaveHandler.addLeave);
salespersonRouter.route("/leave").get(GetAllLeavesHandler.getAllLeaves);




export default salespersonRouter;