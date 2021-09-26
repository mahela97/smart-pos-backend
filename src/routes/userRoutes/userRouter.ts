import { Router } from "express";
import RegisterUserHandler from "../../services/userServices/registerUser/registerUserHandler";
import GetCurrentUserHandler from "../../services/userServices/getCurrentUser/GetCurrentUserHandler";

const userRouter = Router();

userRouter.route("/register").post(RegisterUserHandler.registerUser);
userRouter.route("/me").get(GetCurrentUserHandler.getCurrentUser);

export default userRouter;
