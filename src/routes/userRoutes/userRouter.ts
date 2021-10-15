import { Router } from "express";
import RegisterUserHandler from "../../services/userServices/registerUser/registerUserHandler";
import GetCurrentUserHandler from "../../services/userServices/getCurrentUser/GetCurrentUserHandler";
import UpdateUserLocationHandler from "../../services/userServices/updateUserLocation/updateUserLocationHandler";

const userRouter = Router();

userRouter.route("/register").post(RegisterUserHandler.registerUser);
userRouter.route("/updateLocation/:salesperson").patch(UpdateUserLocationHandler.updateUserLocation);
userRouter.route("/me/:uid").get(GetCurrentUserHandler.getCurrentUser);


export default userRouter;
