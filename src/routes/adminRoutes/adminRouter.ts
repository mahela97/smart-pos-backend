import { Router } from "express";
import warehouseRouter from "./warehouseRouter";

const adminRouter = Router();

adminRouter.use("/warehouse", warehouseRouter);
export default adminRouter;
