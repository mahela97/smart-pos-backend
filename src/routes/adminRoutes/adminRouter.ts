import { Router } from "express";
import warehouseRouter from "./warehouseRouter";
import managerRouter from "./managerRouter";
import salespersonRouter from "./salespersonRouter";

const adminRouter = Router();

adminRouter.use("/warehouse", warehouseRouter);
adminRouter.use("/managers", managerRouter);
adminRouter.use("/salespersons", salespersonRouter);

export default adminRouter;
