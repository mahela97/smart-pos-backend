import { Router } from "express";
import AddShopHandler from "../../services/salespersonServices/addShop/addShopHanlder";

const salespersonRouter = Router();

salespersonRouter.route("/shop").post(AddShopHandler.addShop);

export default salespersonRouter;