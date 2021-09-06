import { Router } from "express";
import AddWarehouseHandler from "../../services/adminServices/addWarehouse/addWarehouseHandler";
import GetAllWarehouseHandler from "../../services/adminServices/getAllWarehouses/getAllWarehouseHandler";

const adminRouter = Router();

adminRouter
    .route("/warehouse")
    .post(AddWarehouseHandler.addWarehouse);

adminRouter.route("/warehouse").get(GetAllWarehouseHandler.getAllWarehouse);

export default adminRouter;
