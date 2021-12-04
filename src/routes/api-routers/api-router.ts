import { Router } from "express";
import userRouter from "../userRoutes/userRouter";
import adminRouter from "../adminRoutes/adminRouter";
import salespersonRouter from "../salespersonRoutes/salespersonRouter";
import managerRouter from "../managerRoutes/managerRouter";

const apiRouter = Router();

apiRouter.use("/users", userRouter);
apiRouter.use("/admin", adminRouter);
apiRouter.use("/salesperson", salespersonRouter);
apiRouter.use("/manager", managerRouter);

export default apiRouter;
