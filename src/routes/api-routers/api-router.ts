import { Router } from "express";
import userRouter from "../userRoutes/userRouter";
import adminRouter from "../adminRoutes/adminRouter";

const apiRouter = Router();

apiRouter.use("/users",userRouter);
apiRouter.use("/admin",adminRouter);

export default apiRouter;