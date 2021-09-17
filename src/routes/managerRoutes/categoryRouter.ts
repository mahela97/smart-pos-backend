import {Router} from "express";
import AddCategoryHandler from "../../services/managerServices/addCategory/addCategoryHandler";
import GetAllCategoryHandler from "../../services/managerServices/getAllCategories/getAllCategoryHandler";

const categoryRouter = Router();
categoryRouter
    .route("/")
    .post(AddCategoryHandler.addCategory);

categoryRouter.route("/").get(GetAllCategoryHandler.getAllCategory);

export default categoryRouter;