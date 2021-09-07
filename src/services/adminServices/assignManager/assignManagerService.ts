import WarehouseDAO from "../../../dao/warehouseDAO";
import UserDAO from "../../../dao/userDAO";

export default class AssignManagerService {
  constructor(
    protected warehouseDao: WarehouseDAO,
    protected userDao: UserDAO
  ) {}

  async assignManager(warehouseId: string, managerId: string): Promise<void> {
    await this.userDao.assignWarehouse(warehouseId, managerId);
    await this.warehouseDao.assignManager(managerId, warehouseId);
  }
}
