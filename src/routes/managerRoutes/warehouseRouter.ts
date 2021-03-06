import { Router } from "express";
import AddWarehouseProductHandler from "../../services/managerServices/addWarehouseProduct/addWarehouseProductHandler";
import GetAllWarehouseProductsHandler from "../../services/managerServices/getAllWarehouseProducts/getAllWarehouseProductsHandler";
import UpdateWarehouseProductHandler from "../../services/managerServices/updateWarehouseProduct/updateWarehouseProductHandler";
import GetOneWarehouseHandler from "../../services/adminServices/getOneWarehouse/getOneWarehousehandler";
import DeleteWarehouseProductHandler
    from "../../services/managerServices/deleteWarehouseProduct/deleteWarehouseProductHandler";

const warehouseRouter = Router();

warehouseRouter
  .route("/:id")
  .post(AddWarehouseProductHandler.addWarehouseProduct);
warehouseRouter
  .route("/:id")
  .get(GetAllWarehouseProductsHandler.getAllWarehouseProducts);
warehouseRouter
  .route("/:id")
  .patch(UpdateWarehouseProductHandler.updateWarehouseProduct);
warehouseRouter
  .route("/:id/details")
  .get(GetOneWarehouseHandler.getWarehouse);
warehouseRouter
    .route("/:warehouseId/product/:productId")
    .delete(DeleteWarehouseProductHandler.deleteWarehouseProduct);

export default warehouseRouter;
