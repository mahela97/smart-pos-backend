import SalesProductObjectModel from "./salesProductObjectModel";

interface DailyProductModel {
  dailyProducts: SalesProductObjectModel[];
  salespersonId: string;
}

export default DailyProductModel;
