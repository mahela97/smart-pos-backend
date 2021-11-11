import UserDAO from "../../../dao/userDAO";
import WarehouseDAO from "../../../dao/warehouseDAO";

export default class UnAssignManagerService {
  constructor(private userDao: UserDAO, private warehouseDao: WarehouseDAO) {}

  async unassignManager(id: string): Promise<void> {
    const warehouse = await this.warehouseDao.findOne(id);
    const {managerId} = warehouse;
    await this.warehouseDao.update({$unset: { managerId: 1}},id);
    await this.userDao.update({$unset: { warehouseId: 1}},managerId);
  }
}
