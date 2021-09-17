import { Router } from "express";
import AddCategoryHandler from "../../services/managerServices/addCategory/addCategoryHandler";
import GetAllCategoryHandler from "../../services/managerServices/getAllCategories/getAllCategoryHandler";
import AddDailyProductsHandler from "../../services/managerServices/addDailyProducts/addDailyProductsHandler";

const managerRouter = Router();

managerRouter.route("/category").post(AddCategoryHandler.addCategory);

managerRouter.route("/category").get(GetAllCategoryHandler.getAllCategory);

managerRouter
  .route("/dailyProducts")
  .post(AddDailyProductsHandler.addDailyProducts);

export default managerRouter;
