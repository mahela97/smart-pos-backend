import { FilterQuery, Model } from "mongoose";

interface QueryHelperResult<T> {
  total: number;
  items: T[];
}

export default class QueryHelper<T extends Document> {
  constructor(
    private query: string,
    private queryFields: string[],
    private populate: string[],
    private sortBy: string,
    private filter: string,
    private page: number,
    private limit: number
  ) {}

  private static findLogic(arg: string): string {
    switch (arg) {
      case "eq":
        return "$eq";
      case "neq":
        return "$ne";
      case "in":
        return "$in";
      case "nin":
        return "$nin";
      case "gt":
        return "$gt";
      case "lt":
        return "$lt";
      default:
        return "$eq";
    }
  }

  public async generate(model: Model<any>): Promise<QueryHelperResult<T>> {
    const q = {
      $or: this.queryFields.map((field) => ({
        [field]: {
          $regex: this.query,
          $options: "i",
        },
      })),
    };
    const filter = this.filter.split(",").map((arg) => {
      const args = arg.trim().split(" ");
      const logic = QueryHelper.findLogic(args[1]);
      const value = args.splice(2);
      const operand = value.length > 1 ? value : value[0];
      return { [args[0]]: { [logic]: operand } };
    });
    const queryFilter = {
      $and: [q, ...filter],
    };
    const order = this.sortBy.startsWith("+") ? 1 : -1;
    const sortBy = this.sortBy.substr(1);
    const total = await model
      .find(queryFilter as FilterQuery<T>)
      .countDocuments()
      .exec();
    let data: any;
    if (this.limit === -1) {
      data = model
        .find(queryFilter as FilterQuery<T>)
        .sort({ [sortBy]: order });
    } else {
      data = model
        .find(queryFilter as FilterQuery<T>)
        .sort({ [sortBy]: order })
        .skip((this.page - 1) * this.limit)
        .limit(this.limit);
    }

    this.populate.forEach((p) => data.populate(p));
    const items = await data.exec();
    return {
      total,
      items,
    };
  }
}
