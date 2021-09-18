import UserDAO from "../dao/userDAO";
import WarehouseDAO from "../dao/warehouseDAO";
import LeaveDAO from "../dao/leaveDAO";
import CategoryDAO from "../dao/categoryDAO";
import ProductDAO from "../dao/productDAO";
import RegisterUserService from "../services/userServices/registerUser/registerUserService";
import AssignManagerService from "../services/adminServices/assignManager/assignManagerService";
import AddShopService from "../services/salespersonServices/addShop/addShopService";
import GetAllShopsService from "../services/salespersonServices/getAllShops/getAllShopsService";
import AddLeaveService from "../services/salespersonServices/addLeave/addLeaveService";
import GetAllLeavesService from "../services/salespersonServices/getAllLeaves/getAllLeavesService";
import AddCategoryService from "../services/managerServices/addCategory/addCaregoryService";
import GetAllCategoryService from "../services/managerServices/getAllCategories/getAllCategoryServices";
import AddProductService from "../services/managerServices/addProduct/addProductService";
import GetAllProductService from "../services/managerServices/getAllProducts/getAllProductService";
import GetOneManagerService from "../services/adminServices/getOneManager/getOneManagerService";
import GetAllManagerService from "../services/adminServices/getAllmanagers/getAllManagerService";
import GetOneProductService from "../services/managerServices/getOneProduct/getOneProductService";
import UpdateProductService from "../services/managerServices/updateProduct/updateProductService";
import AddOrderService from "../services/salespersonServices/addOrder/addOrderService";
import GetOneWarehouseService from "../services/adminServices/getOneWarehouse/getOneWarehouseService";
import GetAllWarehouseService from "../services/adminServices/getAllWarehouses/getAllWarehouseService";
// import GetWarehouseSalesService from "../services/adminServices/getWarehouseSales/getWarehouseSalesService";
import GetOneShopService from "../services/salespersonServices/getOneShop/getoneShopService";
import AddWarehouseService from "../services/adminServices/addWarehouse/addWarehouseService";
import GetOrdersOfOneShopService from "../services/salespersonServices/getOdersOfOneShop/getOrdersOfOneShopService";
import ShopDAO from "../dao/shopDAO";
import OrderDAO from "../dao/orderDAO";
import GetLeavesService from "../services/managerServices/getLeaves/getLeavesServices";
import UpdateLeaveService from "../services/managerServices/updateLeave/updateLeavesServices";
import DailyProductsDAO from "../dao/dailyProductsDAO";
import AddDailyProductsService from "../services/managerServices/addDailyProducts/addDailyProductsService";
import GetDailyProductsService from "../services/salespersonServices/getDailyProducts/getDailyProductsService";

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

  // categories
  static get categoryDAO(): CategoryDAO {
    const key = "category_dao";
    if (!this.instances.get(key)) {
      this.instances.set(key, new CategoryDAO());
    }
    return this.instances.get(key);
  }

  // product
  static get productDAO(): ProductDAO {
    const key = "product_dao";
    if (!this.instances.get(key)) {
      this.instances.set(key, new ProductDAO());
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
    const key = "get_one_warehouses";
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

  static get getOneWarehouse(): GetOneWarehouseService {
    const key = "get_one_service";
    if (!this.instances.get(key)) {
      this.instances.set(key, new GetOneWarehouseService(this.warehouseDAO));
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
    if (!this.instances.get(key)) {
      this.instances.set(key, new OrderDAO());
    }
    return this.instances.get(key);
  }

  // Daily Product
  static get dailyProductsDAO(): DailyProductsDAO {
    const key = "daily_products";
    if (!this.instances.get(key)) {
      this.instances.set(key, new DailyProductsDAO());
    }
    return this.instances.get(key);
  }

  static get addDailyProducts(): AddDailyProductsService {
    const key = "add_dailyProducts_service";
    if (!this.instances.get(key)) {
      this.instances.set(
        key,
        new AddDailyProductsService(this.dailyProductsDAO)
      );
    }
    return this.instances.get(key);
  }

  static get getDailyProducts(): GetDailyProductsService {
    const key = "get_dailyProducts_service";
    if (!this.instances.get(key)) {
      this.instances.set(
        key,
        new GetDailyProductsService(this.dailyProductsDAO)
      );
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

  static get getOneShop(): GetOneShopService {
    const key = "get_one_shop";
    if (!this.instances.get(key)) {
      this.instances.set(key, new GetOneShopService(this.shopDAO));
    }
    return this.instances.get(key);
  }

  static get getOrdersOfOneShop(): GetOrdersOfOneShopService {
    const key = "get_orders_of_one_shop";
    if (!this.instances.get(key)) {
      this.instances.set(key, new GetOrdersOfOneShopService(this.orderDAO));
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

  static get addCategory(): AddCategoryService {
    const key = "add_category_service";
    if (!this.instances.get(key)) {
      this.instances.set(key, new AddCategoryService(this.categoryDAO));
    }
    return this.instances.get(key);
  }

  static get addOrder(): AddOrderService {
    const key = "add_order_service";
    if (!this.instances.get(key)) {
      this.instances.set(key, new AddOrderService(this.orderDAO));
    }
    return this.instances.get(key);
  }

  static get getAllCategories(): GetAllCategoryService {
    const key = "get_all_categories";
    if (!this.instances.get(key)) {
      this.instances.set(key, new GetAllCategoryService(this.categoryDAO));
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

  static get addProduct(): AddProductService {
    const key = "add_product_service";
    if (!this.instances.get(key)) {
      this.instances.set(key, new AddProductService(this.productDAO));
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

  static get getAllProduct(): GetAllProductService {
    const key = "get_all_product";
    if (!this.instances.get(key)) {
      this.instances.set(key, new GetAllProductService(this.productDAO));
    }
    return this.instances.get(key);
  }

  static get getOneProduct(): GetOneProductService {
    const key = "get_one_product";
    if (!this.instances.get(key)) {
      this.instances.set(key, new GetOneProductService(this.productDAO));
    }
    return this.instances.get(key);
  }

  static get updateProduct(): UpdateProductService {
    const key = "update_product";
    if (!this.instances.get(key)) {
      this.instances.set(key, new UpdateProductService(this.productDAO));
    }
    return this.instances.get(key);
  }

  static get getLeaves(): GetLeavesService {
    const key = "get_leaves";
    if (!this.instances.get(key)) {
      this.instances.set(key, new GetLeavesService(this.leaveDAO));
    }
    return this.instances.get(key);
  }

  static get updateLeave(): UpdateLeaveService {
    const key = "update_leave";
    if (!this.instances.get(key)) {
      this.instances.set(key, new UpdateLeaveService(this.leaveDAO));
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
