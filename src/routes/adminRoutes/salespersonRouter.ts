import { Router } from "express";
import GetAllSalespersonsHandlerAdmin from "../../services/adminServices/getAllSalespersons/getAllSalespersonsHandler";
import GetOneSalespersonHandler from "../../services/managerServices/getOneSalesperson/getOneSalespersonHandler";
import GetSalespersonAnalyticsHandler from "../../services/adminServices/getSalespersonAnalytics/getSalespersonAnalyticsHandler";

const salespersonRouter = Router();

salespersonRouter
  .route("/")
  .get(GetAllSalespersonsHandlerAdmin.getAllSalespersons);
salespersonRouter.route("/:id").get(GetOneSalespersonHandler.getOneSalesperson);
salespersonRouter
  .route("/:id/analytics")
  .get(GetSalespersonAnalyticsHandler.getAnalytics);

export default salespersonRouter;
