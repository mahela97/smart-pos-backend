import {Router} from "express";
import AddProductHandler from "../../services/productServices/addProduct/addProductHandler";
import GetAllProductHandler from "../../services/productServices/getAllProducts/getAllProductHandler";

const productRouter = Router();
// product
productRouter
    .route("/")
    .post(AddProductHandler.addProduct);

productRouter.route("/").get(GetAllProductHandler.getAllProduct);


export default productRouter;