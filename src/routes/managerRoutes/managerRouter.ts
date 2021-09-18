import { Router } from "express";
import productRouter from "./productRouter";
import categoryRouter from "./categoryRouter";
import leavesRouter from "./leavesRouter";

const managerRouter = Router();

managerRouter.use("/product", productRouter);
managerRouter.use("/category", categoryRouter);
managerRouter.use("/leaves", leavesRouter);

managerRouter
  .route("/dailyProducts")
  .post(AddDailyProductsHandler.addDailyProducts);

export default managerRouter;
