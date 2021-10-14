import { Router } from "express";
import AddProductHandler from "../../services/managerServices/addProduct/addProductHandler";
import GetAllProductHandler from "../../services/managerServices/getAllProducts/getAllProductHandler";
import GetOneProductHandler from "../../services/managerServices/getOneProduct/getOneProductHandler";
import UpdateProductHandler from "../../services/managerServices/updateProduct/updateProductHandler";
import DeleteProductHandler from "../../services/managerServices/deleteProduct/deleteProductHandler";

const productRouter = Router();
productRouter.route("/").post(AddProductHandler.addProduct);

productRouter.route("/").get(GetAllProductHandler.getAllProduct);
productRouter.route("/:id").get(GetOneProductHandler.getProduct);
productRouter.route("/:id").patch(UpdateProductHandler.updateProduct);
productRouter.route("/:id").delete(DeleteProductHandler.deleteProduct);

export default productRouter;
