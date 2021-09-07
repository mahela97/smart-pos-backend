import {Router} from "express";
import AddCategoryHandler from "../../services/managerServices/addCategory/addCategoryHandler";
import GetAllCategoryHandler from "../../services/managerServices/getAllCategories/getAllCategoryHandler";

const managerRouter = Router();

managerRouter
    .route("/category")
    .post(AddCategoryHandler.addCategory);

managerRouter.route("/category").get(GetAllCategoryHandler.getAllCategory);

export default managerRouter;