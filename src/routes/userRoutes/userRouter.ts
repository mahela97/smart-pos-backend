import { Router } from "express";
import GetCurrentUserHandler from "../../services/userServices/getCurrentUser/GetCurrentUserHandler";
import UpdateUserLocationHandler from "../../services/userServices/updateUserLocation/updateUserLocationHandler";

const userRouter = Router();

userRouter.route("/updateLocation/:salesperson").patch(UpdateUserLocationHandler.updateUserLocation);
userRouter.route("/me/:uid").get(GetCurrentUserHandler.getCurrentUser);

export default userRouter;
