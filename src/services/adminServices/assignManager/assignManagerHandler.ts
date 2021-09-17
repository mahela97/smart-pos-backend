import { Request, Response } from "express";
import Joi from "joi";
import ServiceLocator from "../../../utill/serviceLocator";
import { errorResponse } from "../../../utill/responses";

export default class AssignManagerHandler {
  public static async assignManager(
    req: Request,
    res: Response
  ): Promise<void> {
    const schema = Joi.object({ managerId: Joi.string().required() });
    const validation = schema.validate(req.body);
    const pathSchema = Joi.object({ id: Joi.string().required() });
    const pathValidation = pathSchema.validate(req.params);
    if (pathValidation.error) {
      res.status(401).send(pathValidation.error);
      return;
    }
    if (validation.error) {
      res.status(401).send(validation.error.message);
      return;
    }
    const warehouseId = pathValidation.value.id;
    const { managerId } = validation.value;
    const service = ServiceLocator.assignManager;
    try {
      await service.assignManager(warehouseId, managerId);
      res.status(201).send({ success: 1 });
    } catch (error) {
      console.log(error);
      const errorRs = errorResponse(error);
      res.status(errorRs.code).send(errorRs.message);
    }
  }
}
