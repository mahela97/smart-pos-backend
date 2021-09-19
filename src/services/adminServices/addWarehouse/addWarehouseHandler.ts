import Joi from "joi";
import { Request, Response } from "express";
import ServiceLocator from "../../../utill/serviceLocator";
import WarehouseModel from "../../../models/warehouseModel";
import { errorResponse } from "../../../utill/responses";

export default class AddWarehouseHandler {
  public static async addWarehouse(req: Request, res: Response): Promise<void> {
    const schema = Joi.object({
      district: Joi.string().required(),
      town: Joi.string().required(),
      telephone: Joi.string().required(),
      name: Joi.string().required(),
      salesPersonId: Joi.array().items(Joi.string().allow("")).min(0),
      products: Joi.array().items(Joi.object()),
      managerId: Joi.string().allow(""),
      archived: Joi.boolean().default(false),
    });

    const validation = schema.validate(req.body);
    if (validation.error) {
      res.status(401).send({ message: validation.error.message });
      return;
    }
    const warehouseService = ServiceLocator.addWarehouse;
    const data: WarehouseModel = validation.value;
    try {
      const result = await warehouseService.addWarehouse(data);
      res.status(201).send({ id: result });
    } catch (error) {
      const errorRes = errorResponse(error);
      res.status(errorRes.code).send(errorRes.response);
    }
  }
}
