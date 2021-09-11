import { Router } from "express";
import GetOneManagerHandler from "../../services/adminServices/getOneManager/getOneManagerHandler";
import GetAllManagerHandler from "../../services/adminServices/getAllmanagers/getAllManagerHandler";
import RegisterUserHandler from "../../services/userServices/registerUser/registerUserHandler";

const managerRouter = Router();

managerRouter.route("/:id").get(GetOneManagerHandler.getOneManager);
managerRouter.route("/").get(GetAllManagerHandler.getAllManagers);
managerRouter.route("/").post(RegisterUserHandler.registerUser);

export default managerRouter;
