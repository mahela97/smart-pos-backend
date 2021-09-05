import { Router } from "express";
import RegisterUserHandler from "../../services/userServices/registerUser/registerUserHandler";

const userRouter = Router();

userRouter
    .route("/register")
    .post(RegisterUserHandler.registerUser);

export default userRouter;
