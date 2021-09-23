import { Router } from "express";
import AddDailyProductsHandler from "../../services/managerServices/addDailyProducts/addDailyProductsHandler";
import GetAllDailyProductsHandler from "../../services/managerServices/getAllDailyProducts/getAllDailyProductsHandler";

const dailyProductsRouter = Router();

dailyProductsRouter.route("/:id").post(AddDailyProductsHandler.addDailyProducts);
dailyProductsRouter.route("/:id").get(GetAllDailyProductsHandler.getAllDailyProducts);

export default dailyProductsRouter;
