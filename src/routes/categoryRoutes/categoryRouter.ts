import {Router} from "express";
import AddCategoryHandler from "../../services/categoryServices/addCategory/addCategoryHandler";
import GetAllCategoryHandler from "../../services/categoryServices/getAllCategories/getAllCategoryHandler";

const categoryRouter = Router();

// category
categoryRouter
    .route("/")
    .post(AddCategoryHandler.addCategory);

categoryRouter.route("/").get(GetAllCategoryHandler.getAllCategory);


export default categoryRouter;