import { Router } from "express";
import GetCurrentUserHandler from "../../services/userServices/getCurrentUser/GetCurrentUserHandler";
import UpdateUserLocationHandler from "../../services/userServices/updateUserLocation/updateUserLocationHandler";
import RegisterUserHandler from "../../services/userServices/registerUser/registerUserHandler";

const userRouter = Router();

userRouter.route("/updateLocation/:salesperson").patch(UpdateUserLocationHandler.updateUserLocation);
userRouter.route("/me/:uid").get(GetCurrentUserHandler.getCurrentUser);
userRouter.route("/register").post(RegisterUserHandler.registerUser);

export default userRouter;
