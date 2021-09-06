import UserDAO from "../dao/userDAO";
import WarehouseDAO from "../dao/warehouseDAO";
import ShopDAO from "../dao/shopDAO";

import RegisterUserService from "../services/userServices/registerUser/registerUserService";
import AddWarehouseService from "../services/adminServices/addWarehouse/addWarehouseService";
import GetAllWarehouseService from "../services/adminServices/getAllWarehouses/getAllWarehouseService";
import AddShopService from "../services/salespersonServices/addShop/addShopService";


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
  static get warehouseDAO():WarehouseDAO{
    const key = "warehouse_dao";
    if(!this.instances.get(key)){
      this.instances.set(key,new WarehouseDAO());
    }
    return this.instances.get(key);
  }

  // Shop
  static get shopDAO(): ShopDAO{
    const key = "shop_dao";
    if(!this.instances.get(key)){
      this.instances.set(key, new ShopDAO());
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

  static get getAllWarehouses():GetAllWarehouseService{
    const key = "get_all_warehouses";
    if (!this.instances.get(key)) {
      this.instances.set(key, new GetAllWarehouseService(this.warehouseDAO));
    }
    return this.instances.get(key);
  }


  static get addShop(): AddShopService {
    const key = "add_shop_service";
    if(!this.instances.get(key)){
      this.instances.set(key, new AddShopService((this.shopDAO)));
    }
    return this.instances.get(key);
  }


  
}
