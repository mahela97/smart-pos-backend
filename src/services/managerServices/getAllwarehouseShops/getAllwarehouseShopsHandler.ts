import Joi from "joi";
import { Request, Response } from "express";
import { errorResponse } from "../../../utill/responses";
import ServiceLocator from "../../../utill/serviceLocator";

export default class GetAllwarehouseShopsHandler {
  public static async getAllWarehouseShops(
    req: Request,
    res: Response
  ): Promise<void> {
    const schema = Joi.object({
      query: Joi.string().allow("").default(""),
      sortBy: Joi.string().required(),
      page: Joi.number().default(1),
      limit: Joi.number().default(100),
      filter: Joi.string().allow("").default(""),
    });

    const pathSchema = Joi.object({ id: Joi.string().required() });
    const pathValidation = pathSchema.validate(req.params);
    if (pathValidation.error) {
      res.status(401).send(pathValidation.error);
      return;
    }
    const { id } = pathValidation.value;
    const validation = schema.validate(req.query);
    if (validation.error) {
      res.status(401).send({ message: validation.error.message });
      return;
    }
    const data = validation.value;
    const service = ServiceLocator.getAllWarehouseShops;
    try {
      const result = await service.getAllWarehouseShops(id, data);
      res.status(201).send({ shops: result ? result.items : [] });
    } catch (error) {
      const errorRes = errorResponse(error);
      res.status(errorRes.code).send(errorRes.response);
    }
  }
}
