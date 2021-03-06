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
      salesperson:Joi.string().required(),
      createdAt: Joi.date().required(),
      archived: Joi.boolean().default(false),
    });
    const pathSchema = Joi.object({ id: Joi.string().required() });
    const pathValidation = pathSchema.validate(req.params);
    if (pathValidation.error) {
      res.status(401).send(pathValidation.error);
      return;
    }
    const { id } = pathValidation.value;

    const validation = schema.validate(req.body);
    if (validation.error) {
      res.status(401).send({ message: validation.error.message });
      return;
    }
    const data: DailyProductModel = validation.value;
    const service = ServiceLocator.addDailyProducts;
    try {
      const result = await service.addDailyProducts(id, data);
      res.status(201).send({ id: result });
    } catch (error) {
      const errorRes = errorResponse(error);
      res.status(errorRes.code).send(errorRes.response);
    }
  }
}
