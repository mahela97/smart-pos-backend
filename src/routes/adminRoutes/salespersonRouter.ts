import { Router } from "express";
import GetAllSalespersonsHandlerAdmin from "../../services/adminServices/getAllSalespersons/getAllSalespersonsHandler";
import GetOneSalespersonHandler from "../../services/managerServices/getOneSalesperson/getOneSalespersonHandler";
import GetSalespersonAnalyticsHandler from "../../services/adminServices/getSalespersonAnalytics/getSalespersonAnalyticsSalesHandler";
import GetSalespersonAnalyticsProductsRangeHandler from "../../services/adminServices/getSalespersonAnalyticsProductsRange/getSalespersonAnalyticsProductsRangeHandler";
import GetSalespersonAnalyticsSalesRangeHandler from "../../services/adminServices/getSalespersonAnalyticsSalesRange/getSalespersonAnalyticsSalesRangeHandler";
import GetSalespersonAnalyticsProdutcsDateHandler from "../../services/adminServices/getSalespersonAnalyticsProductsDate/getSalespersonAnalyticsProdutcsDateHandler";
import GetSalespersonAnalyticsSalesDateHandler from "../../services/adminServices/getSalespersonAnalyticsSalesDate/getSalespersonAnalyticsSalesDateHandler";

const salespersonRouter = Router();

salespersonRouter
  .route("/")
  .get(GetAllSalespersonsHandlerAdmin.getAllSalespersons);

salespersonRouter
  .route("/:id/analytics/products/range")
  .get(GetSalespersonAnalyticsProductsRangeHandler.getAnalytics);

salespersonRouter
  .route("/:id/analytics/sales/range")
  .get(GetSalespersonAnalyticsSalesRangeHandler.getAnalytics);

salespersonRouter
  .route("/:id/analytics/products/date")
  .get(GetSalespersonAnalyticsProdutcsDateHandler.getAnalytics);

salespersonRouter
  .route("/:id/analytics/sales/date")
  .get(GetSalespersonAnalyticsSalesDateHandler.getAnalytics);
salespersonRouter.route("/:id").get(GetOneSalespersonHandler.getOneSalesperson);
salespersonRouter
  .route("/:id/analytics")
  .get(GetSalespersonAnalyticsHandler.getAnalytics);

export default salespersonRouter;
