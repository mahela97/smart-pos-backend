import { DbModel } from "./dbModel";

export interface IMapper<T extends DbModel> {
  fromData(data: any): T | undefined;

  toData(item: T): {};
}
