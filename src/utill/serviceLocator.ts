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
import GetAllUnassignedManagerService from "../services/adminServices/getAllUnassignedManagers/getAllUnassignedManagerService";
import GetAllSalespersonsService from "../services/managerServices/getAllSalespersons/getAllSalespersonsService";
import GetOneSalespersonService from "../services/managerServices/getOneSalesperson/getOneSalespersonService";
import GetAllWarehouseProductsService from "../services/managerServices/getAllWarehouseProducts/getAllWarehouseProductsService";
import AddWarehouseProductService from "../services/managerServices/addWarehouseProduct/addWarehouseProductService";
import UpdateWarehouseProductService from "../services/managerServices/updateWarehouseProduct/updateWarehouseProductService";
import GetAllSalespersonsServiceAdmin from "../services/adminServices/getAllSalespersons/getAllSalespersonsService";
import GetSalespersonAnalyticsSalesService from "../services/adminServices/getSalespersonAnalytics/getSalespersonAnalyticsSalesService";
import GetAllOrdersOfOneSalespersonService from "../services/salespersonServices/getAllOrdersOfOneSalesperson/getAllOrdersService";
import GetSalespersonAnalyticsProductsRangeService from "../services/adminServices/getSalespersonAnalyticsProductsRange/getSalespersonAnalyticsProductsRangeService";
import GetSalespersonAnalyticsSalesRangeService from "../services/adminServices/getSalespersonAnalyticsSalesRange/getSalespersonAnalyticsSalesRangeService";
import GetSalespersonAnalyticsProductsDateService from "../services/adminServices/getSalespersonAnalyticsProductsDate/getSalespersonAnalyticsProdutcsDateService";
import GetSalespersonAnalyticsSalesDateService from "../services/adminServices/getSalespersonAnalyticsSalesDate/getSalespersonAnalyticsSalesDateService";
import GetSalespersonsIncomeOrderService from "../services/adminServices/getSalespersonsIncome/getSalespersonsIncomeOrderService";
import GetOneWarehouseAnalyticsService from "../services/adminServices/getOneWarehouseAnalytics/getOneWarehouseAnalyticsService";
import UnAssignManagerService from "../services/adminServices/unAssignManager/unAssignManagerService";
import GetAllDailyProductsService from "../services/managerServices/getAllDailyProducts/getAllDailyProductsService";
import AssignShopsToSalespersonService from "../services/managerServices/assignShopsToSalesperson/assignShopsToSalespersonService";
import SalespersonShopsDAO from "../dao/salespersonShopsDAO";
import GetSalespersonShopsService from "../services/managerServices/getSalespersonShops/getSalespersonShopsService";

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

  static get getSalespersoAnalyticsService(): GetSalespersonAnalyticsSalesService {
    const key = "Salesperson_analytic_service";
    if (!this.instances.get(key)) {
      this.instances.set(
        key,
        new GetSalespersonAnalyticsSalesService(this.dailyProductsDAO)
      );
    }
    return this.instances.get(key);
  }

  static get getSalespersonAnalyticsProductsRangeService(): GetSalespersonAnalyticsProductsRangeService {
    const key = "Salesperson_analytic_service_products_range";
    if (!this.instances.get(key)) {
      this.instances.set(
        key,
        new GetSalespersonAnalyticsProductsRangeService(this.dailyProductsDAO)
      );
    }
    return this.instances.get(key);
  }

  static get getSalespersonsIncomeOrderService(): GetSalespersonsIncomeOrderService {
    const key = "all_Salesperson_analytics_sales_range";
    if (!this.instances.get(key)) {
      this.instances.set(
        key,
        new GetSalespersonsIncomeOrderService(this.dailyProductsDAO)
      );
    }
    return this.instances.get(key);
  }

  static get getSalespersonAnalyticsSalesRangeService(): GetSalespersonAnalyticsSalesRangeService {
    const key = "Salesperson_analytic_service_sales_range";
    if (!this.instances.get(key)) {
      this.instances.set(
        key,
        new GetSalespersonAnalyticsSalesRangeService(this.dailyProductsDAO)
      );
    }
    return this.instances.get(key);
  }

  static get getSalespersonAnalyticsProductsDateService(): GetSalespersonAnalyticsProductsDateService {
    const key = "Salesperson_analytic_service_products_date";
    if (!this.instances.get(key)) {
      this.instances.set(
        key,
        new GetSalespersonAnalyticsProductsDateService(this.dailyProductsDAO)
      );
    }
    return this.instances.get(key);
  }

  static get unassignManagerService(): UnAssignManagerService {
    const key = "unassign_manager";
    if (!this.instances.get(key)) {
      this.instances.set(
        key,
        new UnAssignManagerService(this.userDAO, this.warehouseDAO)
      );
    }
    return this.instances.get(key);
  }

  static get getSalespersonAnalyticsSalesDateService(): GetSalespersonAnalyticsSalesDateService {
    const key = "Salesperson_analytic_service_sales_date";
    if (!this.instances.get(key)) {
      this.instances.set(
        key,
        new GetSalespersonAnalyticsSalesDateService(this.dailyProductsDAO)
      );
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

  // Salesperson Shops
  static get salespersonShopsDAO(): SalespersonShopsDAO {
    const key = "salesperson_shops";
    if (!this.instances.get(key)) {
      this.instances.set(key, new SalespersonShopsDAO());
    }
    return this.instances.get(key);
  }

  static get getAllOrdersOfOneSalesperson(): GetAllOrdersOfOneSalespersonService {
    const key = "get_allOrders_fromOneSalesperson";
    if (!this.instances.get(key)) {
      this.instances.set(
        key,
        new GetAllOrdersOfOneSalespersonService(this.orderDAO)
      );
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

  static get getOneWarehouseAnalyticsService(): GetOneWarehouseAnalyticsService {
    const key = "get_one_warehouse_analytics_service";
    if (!this.instances.get(key)) {
      this.instances.set(
        key,
        new GetOneWarehouseAnalyticsService(
          this.dailyProductsDAO,
          this.warehouseDAO
        )
      );
    }
    return this.instances.get(key);
  }

  static get getUnassignedManagers(): GetAllUnassignedManagerService {
    const key = "get_unassigned_manager_service";
    if (!this.instances.get(key)) {
      this.instances.set(key, new GetAllUnassignedManagerService(this.userDAO));
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
      this.instances.set(
        key,
        new AddOrderService(this.orderDAO, this.dailyProductsDAO)
      );
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

  static get getAllSalespersons(): GetAllSalespersonsService {
    const key = "get_all_salespersons";
    if (!this.instances.get(key)) {
      this.instances.set(key, new GetAllSalespersonsService(this.userDAO));
    }
    return this.instances.get(key);
  }

  static get getAllSalespersonAdmin(): GetAllSalespersonsServiceAdmin {
    const key = "get_all_salespersons_admin";
    if (!this.instances.get(key)) {
      this.instances.set(key, new GetAllSalespersonsServiceAdmin(this.userDAO));
    }
    return this.instances.get(key);
  }

  static get getOneSalesperson(): GetOneSalespersonService {
    const key = "get_one_salesperson";
    if (!this.instances.get(key)) {
      this.instances.set(key, new GetOneSalespersonService(this.userDAO));
    }
    return this.instances.get(key);
  }

  static get getAllWarehouseProducts(): GetAllWarehouseProductsService {
    const key = "get_all_warehouse_products";
    if (!this.instances.get(key)) {
      this.instances.set(
        key,
        new GetAllWarehouseProductsService(this.warehouseDAO)
      );
    }
    return this.instances.get(key);
  }

  static get addWarehouseProduct(): AddWarehouseProductService {
    const key = "add_product_to_warehouse";
    if (!this.instances.get(key)) {
      this.instances.set(
        key,
        new AddWarehouseProductService(this.warehouseDAO)
      );
    }
    return this.instances.get(key);
  }

  static get updateWarehouseProduct(): UpdateWarehouseProductService {
    const key = "update_warehouse_product";
    if (!this.instances.get(key)) {
      this.instances.set(
        key,
        new UpdateWarehouseProductService(this.warehouseDAO)
      );
    }
    return this.instances.get(key);
  }

  static get getAllDailyProducts(): GetAllDailyProductsService {
    const key = "get_all_daily_products";
    if (!this.instances.get(key)) {
      this.instances.set(
        key,
        new GetAllDailyProductsService(this.dailyProductsDAO)
      );
    }
    return this.instances.get(key);
  }

  static get assignShopsToSalesperson(): AssignShopsToSalespersonService {
    const key = "assign_shops_to_salesperson";
    if (!this.instances.get(key)) {
      this.instances.set(
        key,
        new AssignShopsToSalespersonService(this.salespersonShopsDAO)
      );
    }
    return this.instances.get(key);
  }

  static get getSalespersonShops(): GetSalespersonShopsService {
    const key = "get_salesperson_shops";
    if (!this.instances.get(key)) {
      this.instances.set(
        key,
        new GetSalespersonShopsService(this.salespersonShopsDAO)
      );
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
