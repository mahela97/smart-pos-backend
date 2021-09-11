import { Router } from "express";
import warehouseRouter from "./warehouseRouter";
import managerRouter from "./managerRouter";

const adminRouter = Router();

adminRouter.use("/warehouse", warehouseRouter);
adminRouter.use("/managers", managerRouter);

export default adminRouter;
