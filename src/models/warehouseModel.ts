import ProductObjectModel from "./productObjectModel";

interface WarehouseModel {
  district: string;
  town: string;
  telephone: string;
  name: string;
  salesPersonId?: string[];
  products?: ProductObjectModel[];
  managerId?: string;
  archived: boolean;
}

export default WarehouseModel;
