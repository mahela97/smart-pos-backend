import SalesProductObjectModel from "./salesProductObjectModel";

interface DailyProductModel {
  dailyProducts: SalesProductObjectModel[];
  salespersonId: string;
  createdAt: Date;
}

export default DailyProductModel;
