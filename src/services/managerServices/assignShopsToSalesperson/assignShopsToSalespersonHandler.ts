import Joi from "joi";
import { Request, Response } from "express";
import ServiceLocator from "../../../utill/serviceLocator";
import { errorResponse } from "../../../utill/responses";

export default class AssignShopsToSalespersonHandler {
  public static async assignShopsToSalesperson(
    req: Request,
    res: Response
  ): Promise<void> {
    const schema = Joi.object({
      shops: Joi.array().items(Joi.string().allow("")).min(0),
    });
    const pathSchema = Joi.object({ id: Joi.string().required() });
    const pathValidation = pathSchema.validate(req.params);
    if (pathValidation.error) {
      res.status(401).send(pathValidation.error);
      return;
    }
    const validation = schema.validate(req.body);
    if (validation.error) {
      res.status(401).send({ message: validation.error.message });
      return;
    }
    const { id } = pathValidation.value;
    const { shops } = validation.value;
    const service = ServiceLocator.assignShopsToSalesperson;
    try {
      const result = await service.assignShopsToSalesperson(id, shops);
      res.status(201).send({ id: result });
    } catch (error) {
      const errorRes = errorResponse(error);
      res.status(errorRes.code).send(errorRes.response);
    }
  }
}
