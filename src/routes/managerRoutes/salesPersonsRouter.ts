import { Router } from "express";
import RegisterUserHandler from "../../services/userServices/registerUser/registerUserHandler";
import GetAllSalespersonsHandler from "../../services/managerServices/getAllSalespersons/getAllSalespersonsHandler";
import GetOneSalespersonHandler from "../../services/managerServices/getOneSalesperson/getOneSalespersonHandler";

const salesPersonsRouter = Router();

salesPersonsRouter.route("/").post(RegisterUserHandler.registerUser);
salesPersonsRouter.route("/getAll/:id").get(GetAllSalespersonsHandler.getAllSalespersons);
salesPersonsRouter
  .route("/getOne/:id")
  .get(GetOneSalespersonHandler.getOneSalesperson);
// salesPersonsRouter.route("/:id").patch(EditSalespersonHandler.editSalesperson);

export default salesPersonsRouter;
