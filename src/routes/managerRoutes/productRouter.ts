import {Router} from "express";
import AddProductHandler from "../../services/managerServices/addProduct/addProductHandler";
import GetAllProductHandler from "../../services/managerServices/getAllProducts/getAllProductHandler";
import GetOneProductHandler from "../../services/managerServices/getOneProduct/getOneProductHandler";

const productRouter = Router();
productRouter
    .route("/")
    .post(AddProductHandler.addProduct);

productRouter.route("/").get(GetAllProductHandler.getAllProduct);
productRouter.route("/:id").get(GetOneProductHandler.getProduct);

export default productRouter;