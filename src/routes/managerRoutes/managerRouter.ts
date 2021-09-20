import { Router } from "express";
import productRouter from "./productRouter";
import categoryRouter from "./categoryRouter";
import leavesRouter from "./leavesRouter";
import dailyProductsRouter from "./dailyProductsRouter";
import salesPersonsRouter from "./salesPersonsRouter";
import warehouseRouter from "./warehouseRouter";

const managerRouter = Router();

managerRouter.use("/product", productRouter);
managerRouter.use("/category", categoryRouter);
managerRouter.use("/leaves", leavesRouter);
managerRouter.use("/dailyProducts", dailyProductsRouter);
managerRouter.use("/salespersons", salesPersonsRouter);
managerRouter.use("/warehouse", warehouseRouter);

export default managerRouter;
