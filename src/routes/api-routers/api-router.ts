import { Router } from "express";
import userRouter from "../userRoutes/userRouter";

const apiRouter = Router();


apiRouter.use("/users",userRouter);



export default apiRouter;