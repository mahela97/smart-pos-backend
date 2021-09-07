import {Router} from "express";
import AddCategoryHandler from "../../services/managerServices/addCategory/addCategoryHandler";
import GetAllCategoryHandler from "../../services/managerServices/getAllCategories/getAllCategoryHandler";
import AddProductHandler from "../../services/managerServices/addProduct/addProductHandler";
import GetAllProductHandler from "../../services/managerServices/getAllProducts/getAllProductHandler";

const managerRouter = Router();

// category
managerRouter
    .route("/category")
    .post(AddCategoryHandler.addCategory);

managerRouter.route("/category").get(GetAllCategoryHandler.getAllCategory);

// product
console.log("gg");
managerRouter
    .route("/products")
    .post(AddProductHandler.addProduct);

managerRouter.route("/product").get(GetAllProductHandler.getAllProduct);


export default managerRouter;