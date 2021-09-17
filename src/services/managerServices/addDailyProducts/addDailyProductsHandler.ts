import Joi from "joi";
import { Request, Response } from "express";
import ServiceLocator from "../../../utill/serviceLocator";
import DailyProductModel from "../../../models/dailyProductModel";
import { errorResponse } from "../../../utill/responses";

export default class AddDailyProductsHandler {
  public static async addDailyProducts(
    req: Request,
    res: Response
  ): Promise<void> {
    const schema = Joi.object({
      dailyProducts: Joi.array().required(),
      salesperson: Joi.string().required(),
      archived: Joi.boolean().default(false),
    });

    const validation = schema.validate(req.body);
    if (validation.error) {
      res.status(401).send({ message: validation.error.message });
      return;
    }
    const service = ServiceLocator.addDailyProducts;
    const data: DailyProductModel = validation.value;
    try {
      const result = await service.addDailyProducts(data);
      res.status(201).send({ id: result });
    } catch (error) {
      const errorRes = errorResponse(error);
      res.status(errorRes.code).send(errorRes.response);
    }
  }
}
