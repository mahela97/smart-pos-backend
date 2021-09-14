import UserDAO from "../dao/userDAO";
import WarehouseDAO from "../dao/warehouseDAO";
import ShopDAO from "../dao/shopDAO";
import LeaveDAO from "../dao/leaveDAO";
import OrderDAO from "../dao/orderDAO";

import RegisterUserService from "../services/userServices/registerUser/registerUserService";
import AddWarehouseService from "../services/adminServices/addWarehouse/addWarehouseService";
import GetAllWarehouseService from "../services/adminServices/getAllWarehouses/getAllWarehouseService";
import AssignManagerService from "../services/adminServices/assignManager/assignManagerService";
import AddShopService from "../services/salespersonServices/addShop/addShopService";
import GetAllShopsService from "../services/salespersonServices/getAllShops/getAllShopsService";
import AddLeaveService from "../services/salespersonServices/addLeave/addLeaveService";
import GetAllLeavesService from "../services/salespersonServices/getAllLeaves/getAllLeavesService";
import GetOneWarehouseService from "../services/adminServices/getOneWarehouse/getOneWarehouseService";
import GetOneManagerService from "../services/adminServices/getOneManager/getOneManagerService";
import GetAllManagerService from "../services/adminServices/getAllmanagers/getAllManagerService";
import AddOrderService from "../services/salespersonServices/addOrder/addOrderService";
// import GetWarehouseSalesService from "../services/adminServices/getWarehouseSales/getWarehouseSalesService";

export default class ServiceLocator {
  private static readonly instances: Map<string, any> = new Map<string, any>();

  static get registerWebUser(): RegisterUserService {
    const key = "register_user";
    if (!this.instances.get(key)) {
      this.instances.set(key, new RegisterUserService(this.userDAO));
    }
    return this.instances.get(key);
  }

  // user
  static get userDAO(): UserDAO {
    const key = "user_dao";
    if (!this.instances.get(key)) {
      this.instances.set(key, new UserDAO());
    }
    return this.instances.get(key);
  }

  // warehouse
  static get warehouseDAO(): WarehouseDAO {
    const key = "warehouse_dao";
    if (!this.instances.get(key)) {
      this.instances.set(key, new WarehouseDAO());
    }
    return this.instances.get(key);
  }

  static get addWarehouse(): AddWarehouseService {
    const key = "add_warehouse_service";
    if (!this.instances.get(key)) {
      this.instances.set(key, new AddWarehouseService(this.warehouseDAO));
    }
    return this.instances.get(key);
  }

  static get getAllWarehouses(): GetAllWarehouseService {
    const key = "get_all_warehouses";
    if (!this.instances.get(key)) {
      this.instances.set(key, new GetAllWarehouseService(this.warehouseDAO));
    }
    return this.instances.get(key);
  }

  static get assignManager(): AssignManagerService {
    const key = "assign_manager_warehouse";
    if (!this.instances.get(key)) {
      this.instances.set(
        key,
        new AssignManagerService(this.warehouseDAO, this.userDAO)
      );
    }
    return this.instances.get(key);
  }
  // ###########################################################################################################

  // Shop
  static get shopDAO(): ShopDAO {
    const key = "shop_dao";
    if (!this.instances.get(key)) {
      this.instances.set(key, new ShopDAO());
    }
    return this.instances.get(key);
  }

  // Leave
  static get leaveDAO(): LeaveDAO {
    const key = "leave_dao";
    if (!this.instances.get(key)) {
      this.instances.set(key, new LeaveDAO());
    }
    return this.instances.get(key);
  }

  // Order
  static get orderDAO(): OrderDAO {
    const key = "order_dao";
    if(!this.instances.get(key)){
      this.instances.set(key, new OrderDAO());
    }
    return this.instances.get(key);
  }



  static get addShop(): AddShopService {
    const key = "add_shop_service";
    if (!this.instances.get(key)) {
      this.instances.set(key, new AddShopService(this.shopDAO));
    }
    return this.instances.get(key);
  }

  static get getAllShops(): GetAllShopsService {
    const key = "get_all_shops";
    if (!this.instances.get(key)) {
      this.instances.set(key, new GetAllShopsService(this.shopDAO));
    }
    return this.instances.get(key);
  }

  static get addLeave(): AddLeaveService {
    const key = "add_leave_service";
    if (!this.instances.get(key)) {
      this.instances.set(key, new AddLeaveService(this.leaveDAO));
    }
    return this.instances.get(key);
  }

  static get getAllLeaves(): GetAllLeavesService {
    const key = "get_all_leaves";
    if (!this.instances.get(key)) {
      this.instances.set(key, new GetAllLeavesService(this.leaveDAO));
    }
    return this.instances.get(key);
  }

  static get addOrder(): AddOrderService {
    const key = "add_order_service";
    if(!this.instances.get(key)){
      this.instances.set(key, new AddOrderService(this.orderDAO));
    }
    return this.instances.get(key);
  }


  // ##############################################################################################################


  static get getOneWarehouse(): GetOneWarehouseService {
    const key = "get_one_warehouse";
    if (!this.instances.get(key)) {
      this.instances.set(key, new GetOneWarehouseService(this.warehouseDAO));
    }
    return this.instances.get(key);
  }

  static get getOneManager(): GetOneManagerService {
    const key = "get_one_manager";
    if (!this.instances.get(key)) {
      this.instances.set(key, new GetOneManagerService(this.userDAO));
    }
    return this.instances.get(key);
  }

  static get getAllManagers(): GetAllManagerService {
    const key = "get_all_managers";
    if (!this.instances.get(key)) {
      this.instances.set(key, new GetAllManagerService(this.userDAO));
    }
    return this.instances.get(key);
  }

  // static get getWarehouseSales(): GetWarehouseSalesService {
  //   const key = "get_warehouse_sales";
  //   if (!this.instances.get(key)) {
  //     this.instances.set(key, new GetWarehouseSalesService());
  //   }
  // }
}
