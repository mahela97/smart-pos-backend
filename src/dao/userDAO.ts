import mongodb = require("mongodb");
import UserModel from "../models/userModel";
import User, { UserDocument } from "../schemaModels/user.model";
import Dao from "../interfaces/dao";
import QueryHelper from "../utill/QueryHelper";

const { ObjectID } = mongodb;

export default class UserDAO extends Dao {
  constructor() {
    super(User);
  }

  public async add(userData: UserModel): Promise<UserDocument> {
    return super.add(userData);
  }

  public async getUserByUid(uid: string): Promise<UserDocument> {
    return this.model.findOne({ uid });
  }

  public async getAllUnassignedManagers(): Promise<UserDocument[]> {
    const result = await this.model.find({
      role: "manager",
      warehouseId: { $exists: false },
      archived: false,
    });
    return result;
  }

  public async assignWarehouse(
    warehouseId: string,
    managerId: string
  ): Promise<void> {
    await this.model.findByIdAndUpdate(new ObjectID(managerId), {
      warehouseId,
    });
  }

  public async getAllManagers(
    filterData: Record<string, any>
  ): Promise<Record<string, any>> {
    let filter = "role eq manager,archived eq false";
    if (filterData.filter) {
      filter += `,${filterData.filter}`;
    }
    const queryHelper = new QueryHelper(
      filterData.query,
      ["firstName"],
      ["warehouseId"],
      filterData.sortBy,
      filter,
      filterData.page,
      filterData.limit
    );

    return queryHelper.generate(User);
  }

  public async getAllSalespersons(
    filterData: Record<string, any>,
    id?: string
  ): Promise<Record<string, any>> {
    let filter = "";
    if (id) {
      filter = `role eq salesperson,archived eq false,warehouseId eq ${id}`;
    } else {
      filter = `role eq salesperson,archived eq false`;
    }
    if (filterData.filter) {
      filter += `,${filterData.filter}`;
    }
    const queryHelper = new QueryHelper(
      filterData.query,
      ["firstName"],
      ["warehouseId"],
      filterData.sortBy,
      filter,
      filterData.page,
      filterData.limit
    );

    return queryHelper.generate(User);
  }

  public async addUser(
    userData: UserModel,
    session: any
  ): Promise<UserDocument> {
    // eslint-disable-next-line new-cap
    return new this.model(userData).save(session);
  }

  public async getOneManager(id: string): Promise<UserDocument> {
    return this.model
      .findOne({ _id: id, role: "manager", archived: false })
      .populate("warehouseId");
  }

  public async getOneSalesperson(id: string): Promise<UserDocument> {
    return this.model
      .findOne({
        _id: id,
        role: "salesperson",
        archived: false,
      })
      .populate("warehouseId");
  }

  public async updateLocation(
      userId: string,
      userLocation: Partial<UserModel>
  ): Promise<void>{
    await this.model.findByIdAndUpdate(new ObjectID(userId), userLocation);
  }
}
