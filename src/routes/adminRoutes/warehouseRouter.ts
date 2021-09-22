import { Router } from "express";
import AddWarehouseHandler from "../../services/adminServices/addWarehouse/addWarehouseHandler";
import GetAllWarehouseHandler from "../../services/adminServices/getAllWarehouses/getAllWarehouseHandler";
import AssignManagerHandler from "../../services/adminServices/assignManager/assignManagerHandler";
import GetOneWarehouseHandler from "../../services/adminServices/getOneWarehouse/getOneWarehousehandler";
import GetOneWarehouseAnalyticsHandler from "../../services/adminServices/getOneWarehouseAnalytics/getOneWarehouseAnalyticsHandler";

const warehouseRouter = Router();

warehouseRouter.route("/").post(AddWarehouseHandler.addWarehouse);

warehouseRouter.route("/").get(GetAllWarehouseHandler.getAllWarehouse);
warehouseRouter.route("/:id").patch(AssignManagerHandler.assignManager);
warehouseRouter.route("/:id").get(GetOneWarehouseHandler.getWarehouse);
warehouseRouter
  .route("/:id/analytics")
  .get(GetOneWarehouseAnalyticsHandler.getAnalytics);

export default warehouseRouter;
