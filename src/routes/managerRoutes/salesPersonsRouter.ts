import { Router } from "express";
import RegisterUserHandler from "../../services/userServices/registerUser/registerUserHandler";
import GetAllSalespersonsHandler from "../../services/managerServices/getAllSalespersons/getAllSalespersonsHandler";

const salesPersonsRouter = Router();

salesPersonsRouter.route("/").post(RegisterUserHandler.registerUser);
salesPersonsRouter.route("/").get(GetAllSalespersonsHandler.getAllSalespersons);

export default salesPersonsRouter;
