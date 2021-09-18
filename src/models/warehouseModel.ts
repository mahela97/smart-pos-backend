interface WarehouseModel {
  location: string;
  telephone: string;
  name: string;
  salesPersonId?: string[];
  products?: string[];
  managerId?: string;
  archived: boolean;
}

export default WarehouseModel;
