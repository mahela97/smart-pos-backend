import WarehouseDAO from "../../../dao/warehouseDAO";
import UserDAO from "../../../dao/userDAO";

export default class AssignManagerService {
  constructor(
    protected warehouseDao: WarehouseDAO,
    protected userDao: UserDAO
  ) {}

  async assignManager(data: Record<string, string>): Promise<void> {}
}
