import { Router } from "express";
import RegisterUserHandler from "../../services/userServices/registerUser/registerUserHandler";
import GetUserRoleHandler from "../../services/userServices/getUserRole/userRoleHandler";

const userRouter = Router();

userRouter.route("/register").post(RegisterUserHandler.registerUser);
userRouter.route("/auth").get(GetUserRoleHandler.getUser);

export default userRouter;
