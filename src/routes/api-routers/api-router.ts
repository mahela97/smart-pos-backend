import { Router } from "express";
import userRouter from "../userRoutes/userRouter";
import adminRouter from "../adminRoutes/adminRouter";
import salespersonRouter from "../salespersonRoutes/salespersonRouter";
import managerRouter from "../managerRoutes/managerRouter";
import productRouter from "../productRoutes/productRouter";


const apiRouter = Router();

apiRouter.use("/users",userRouter);
apiRouter.use("/admin",adminRouter);
apiRouter.use("/salesperson",salespersonRouter);
apiRouter.use("/manager",managerRouter);
apiRouter.use("/product",productRouter);
apiRouter.use("/category",productRouter);

export default apiRouter;