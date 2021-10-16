import { Router } from "express";
import RegisterUserHandler from "../../services/userServices/registerUser/registerUserHandler";
import GetAllSalespersonsHandler from "../../services/managerServices/getAllSalespersons/getAllSalespersonsHandler";
import GetOneSalespersonHandler from "../../services/managerServices/getOneSalesperson/getOneSalespersonHandler";
import EditUserHandler from "../../services/userServices/editUser/editUserHandler";

const salesPersonsRouter = Router();

salesPersonsRouter.route("/").post(RegisterUserHandler.registerUser);
salesPersonsRouter
  .route("/getAll/warehouse/:id")
  .get(GetAllSalespersonsHandler.getAllSalespersons);
salesPersonsRouter
  .route("/:id")
  .get(GetOneSalespersonHandler.getOneSalesperson);
salesPersonsRouter.route("/:id").patch(EditUserHandler.editUser);

export default salesPersonsRouter;
