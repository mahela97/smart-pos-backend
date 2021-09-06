import { Router } from "express";
import AddShopHandler from "../../services/salespersonServices/addShop/addShopHanlder";

const salespersonRouter = Router();

salespersonRouter.route("/shop").post(AddShopHandler.addShop);
salespersonRouter.route("/shop").get();

export default salespersonRouter;