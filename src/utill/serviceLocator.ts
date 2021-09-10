import UserDAO from "../dao/userDAO";
import WarehouseDAO from "../dao/warehouseDAO";
import ShopDAO from "../dao/shopDAO";
import LeaveDAO from "../dao/leaveDAO";
import CategoryDAO from "../dao/categoryDAO";
import ProductDAO from "../dao/productDAO";

import RegisterUserService from "../services/userServices/registerUser/registerUserService";
import AddWarehouseService from "../services/adminServices/addWarehouse/addWarehouseService";
import GetAllWarehouseService from "../services/adminServices/getAllWarehouses/getAllWarehouseService";
import AssignManagerService from "../services/adminServices/assignManager/assignManagerService";
import AddShopService from "../services/salespersonServices/addShop/addShopService";
import GetAllShopsService from "../services/salespersonServices/getAllShops/getAllShopsService";
import AddLeaveService from "../services/salespersonServices/addLeave/addLeaveService";
import GetAllLeavesService from "../services/salespersonServices/getAllLeaves/getAllLeavesService";
import AddCategoryService from "../services/categoryServices/addCategory/addCaregoryService";
import GetAllCategoryService from "../services/categoryServices/getAllCategories/getAllCategoryServices";
import AddProductService from "../services/productServices/addProduct/addProductService";
import GetAllProductService from "../services/productServices/getAllProducts/getAllProductService";

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

// categories
  static get categoryDAO():CategoryDAO{
    const key = "category_dao";
    if(!this.instances.get(key)){
      this.instances.set(key,new CategoryDAO());
    }
    return this.instances.get(key);
  }

// product
  static get productDAO():ProductDAO{
    const key = "product_dao";
    if(!this.instances.get(key)){
      this.instances.set(key,new ProductDAO());
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
  static get shopDAO(): ShopDAO{
    const key = "shop_dao";
    if(!this.instances.get(key)){
      this.instances.set(key, new ShopDAO());
    }
    return this.instances.get(key);
  }

  // Leave
  static get leaveDAO(): LeaveDAO{
    const key = "leave_dao";
    if(!this.instances.get(key)){
      this.instances.set(key, new LeaveDAO());
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

  static get getAllShops():GetAllShopsService{
    const key = "get_all_shops";
    if(!this.instances.get(key)){
      this.instances.set(key, new GetAllShopsService(this.shopDAO));
    }
    return this.instances.get(key);
  }

  static get addLeave(): AddLeaveService {
    const key = "add_leave_service";
    if(!this.instances.get(key)){
      this.instances.set(key, new AddLeaveService((this.leaveDAO)));
    }
    return this.instances.get(key);
  }

  static get getAllLeaves():GetAllLeavesService{
    const key = "get_all_leaves";
    if(!this.instances.get(key)){
      this.instances.set(key, new GetAllLeavesService(this.leaveDAO));
    }
    return this.instances.get(key);
  }

  static get addCategory(): AddCategoryService {
    const key = "add_category_service";
    if (!this.instances.get(key)) {
      this.instances.set(key, new AddCategoryService(this.categoryDAO));
    }
    return this.instances.get(key);
  }

  static get getAllCategories():GetAllCategoryService{
    const key = "get_all_categories";
    if (!this.instances.get(key)) {
      this.instances.set(key, new GetAllCategoryService(this.categoryDAO));
    }
    return this.instances.get(key);
  }

  static get addProduct(): AddProductService {
    const key = "add_product_service";
    if (!this.instances.get(key)) {
      this.instances.set(key, new AddProductService(this.productDAO));
    }
    return this.instances.get(key);
  }

  static get getAllProduct():GetAllProductService{
    const key = "get_all_product";
    if (!this.instances.get(key)) {
      this.instances.set(key, new GetAllProductService(this.productDAO));
    }
    return this.instances.get(key);
  }
}
