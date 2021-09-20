import { Request, Response } from "express";
import Joi from "joi";
import ServiceLocator from "../../../utill/serviceLocator";
import { errorResponse } from "../../../utill/responses";

export default class GetAllSalespersonsHandler {
  public static async getAllSalespersons(req: Request, res: Response) {
    const schema = Joi.object({
      query: Joi.string().allow("").default(""),
      sortBy: Joi.string().required(),
      page: Joi.number().default(1),
      limit: Joi.number().default(10),
      filter: Joi.string().allow(""),
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
    const service = ServiceLocator.getAllSalespersons;
    try {
      const result = await service.getAllSalespersons(id, data);
      res.status(201).send({
        totalItems: result.total,
        items: result.items,
      });
    } catch (error) {
      const errorRes = errorResponse(error);
      res.status(errorRes.code).send(errorRes.response);
    }
  }
}
