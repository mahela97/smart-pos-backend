import { Router } from "express";
import AddWarehouseHandler from "../../services/adminServices/addWarehouse/addWarehouseHandler";
import GetAllWarehouseHandler from "../../services/adminServices/getAllWarehouses/getAllWarehouseHandler";
import AssignManagerHandler from "../../services/adminServices/assignManager/assignManagerHandler";

const adminRouter = Router();

adminRouter.route("/warehouse").post(AddWarehouseHandler.addWarehouse);

adminRouter.route("/warehouse").get(GetAllWarehouseHandler.getAllWarehouse);
adminRouter.route("/warehouse/:id").patch(AssignManagerHandler.assignManager);

export default adminRouter;
