import UserDAO from "../../../dao/userDAO";
import WarehouseDAO from "../../../dao/warehouseDAO";

export default class UnAssignManagerService {
  constructor(private userDao: UserDAO, private warehouseDao: WarehouseDAO) {}

  async unassignManager(id: string): Promise<void> {
    console.log(this.warehouseDao, this.userDao, id);
  }
}
