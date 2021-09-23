import { Router } from "express";
import AssignShopsToSalespersonHandler
    from "../../services/managerServices/assignShopsToSalesperson/assignShopsToSalespersonHandler";
import GetSalespersonShopsHandler from "../../services/managerServices/getSalespersonShops/getSalespersonShopsHandler";

const shopsRouter = Router();

shopsRouter.route("/:id").get(GetSalespersonShopsHandler.getSalespersonShops);
shopsRouter.route("/:id").post(AssignShopsToSalespersonHandler.assignShopsToSalesperson);
// shopsRouter.route("/warehouse/:id").post(GetwarehouseShopsHandler.getWarehouseshops);

export default shopsRouter;
