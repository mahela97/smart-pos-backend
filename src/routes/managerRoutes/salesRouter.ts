import { Router } from "express";
// import GetSalespersonsIncomeOrderHandler from "../../services/adminServices/getSalespersonsIncome/getSalespersonsIncomeOrderHandler";
import GetSalespersonsSalesHandler from "../../services/managerServices/getSalespersonsSales/getSalespersonsSalesHandler";
import GetOneWarehouseAnalyticsHandler from "../../services/adminServices/getOneWarehouseAnalytics/getOneWarehouseAnalyticsHandler";

const salesRouter = Router();

salesRouter
  .route("/warehouse/:id")
  .get(GetSalespersonsSalesHandler.getSalespersonsSales);

salesRouter
  .route("/warehousesales/:id")
  .get(GetOneWarehouseAnalyticsHandler.getAnalytics);

export default salesRouter;
