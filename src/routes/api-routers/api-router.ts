import { Router } from "express";
import userRouter from "../userRoutes/userRouter";
import adminRouter from "../adminRoutes/adminRouter";
import salespersonRouter from "../salespersonRoutes/salespersonRouter";

const apiRouter = Router();

apiRouter.use("/users",userRouter);
apiRouter.use("/admin",adminRouter);
apiRouter.use("/salesperson",salespersonRouter);

export default apiRouter;