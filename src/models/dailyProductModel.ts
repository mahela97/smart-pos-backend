import SalesProductObjectModel from "./salesProductObjectModel";
import UserModel from "./userModel";

interface DailyProductModel {
  dailyProducts: SalesProductObjectModel[];
  salesperson: UserModel | string;
  createdAt: Date;
}

export default DailyProductModel;
