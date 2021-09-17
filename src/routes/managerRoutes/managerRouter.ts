import { Router } from "express";
import productRouter from "./productRouter";
import categoryRouter from "./categoryRouter";

const managerRouter = Router();

managerRouter.use("/product", productRouter);
managerRouter.use("/category", categoryRouter);

managerRouter
  .route("/dailyProducts")
  .post(AddDailyProductsHandler.addDailyProducts);

export default managerRouter;
