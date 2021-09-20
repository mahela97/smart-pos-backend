import { Router } from "express";
import GetOneManagerHandler from "../../services/adminServices/getOneManager/getOneManagerHandler";
import GetAllManagerHandler from "../../services/adminServices/getAllmanagers/getAllManagerHandler";
import RegisterUserHandler from "../../services/userServices/registerUser/registerUserHandler";
import GetAllUnassignedManagerHandler from "../../services/adminServices/getAllUnassignedManagers/getAllUnassignedManagerhandler";

const managerRouter = Router();

managerRouter.route("/").get(GetAllManagerHandler.getAllManagers);
managerRouter
  .route("/unassigned")
  .get(GetAllUnassignedManagerHandler.getAllUnassignedManagers);
managerRouter.route("/").post(RegisterUserHandler.registerUser);
managerRouter.route("/:id").get(GetOneManagerHandler.getOneManager);

export default managerRouter;
