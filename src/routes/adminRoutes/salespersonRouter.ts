import { Router } from "express";
import GetAllSalespersonsHandlerAdmin from "../../services/adminServices/getAllSalespersons/getAllSalespersonsHandler";
import GetOneSalespersonHandler from "../../services/managerServices/getOneSalesperson/getOneSalespersonHandler";
import GetSalespersonAnalyticsProductsRangeHandler from "../../services/adminServices/getSalespersonAnalyticsProductsRange/getSalespersonAnalyticsProductsRangeHandler";
import GetSalespersonAnalyticsSalesRangeHandler from "../../services/adminServices/getSalespersonAnalyticsSalesRange/getSalespersonAnalyticsSalesRangeHandler";
import GetSalespersonAnalyticsProdutcsDateHandler from "../../services/adminServices/getSalespersonAnalyticsProductsDate/getSalespersonAnalyticsProdutcsDateHandler";
import GetSalespersonAnalyticsSalesDateHandler from "../../services/adminServices/getSalespersonAnalyticsSalesDate/getSalespersonAnalyticsSalesDateHandler";
import GetSalespersonsIncomeOrderHandler from "../../services/adminServices/getSalespersonsIncome/getSalespersonsIncomeOrderHandler";

const salespersonRouter = Router();

salespersonRouter
  .route("/")
  .get(GetAllSalespersonsHandlerAdmin.getAllSalespersons);

salespersonRouter
  .route("/analyticsByIncome-range")
  .get(GetSalespersonsIncomeOrderHandler.getAnalytics);

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

export default salespersonRouter;
