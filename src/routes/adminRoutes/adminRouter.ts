import { Router } from "express";
import AddWarehouseHandler from "../../services/adminServices/addWarehouse/addWarehouseHandler";

const adminRouter = Router();

adminRouter
    .route("/warehouse")
    .post(AddWarehouseHandler.addWarehouse);

export default adminRouter;
