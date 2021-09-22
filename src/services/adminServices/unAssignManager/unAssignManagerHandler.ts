import { Request, Response } from "express";
import Joi from "joi";
import ServiceLocator from "../../../utill/serviceLocator";
import { errorResponse } from "../../../utill/responses";

export default class UnAssignManagerHandler {
  public static async unAssignManager(
    req: Request,
    res: Response
  ): Promise<void> {
    const pathSchema = Joi.object({ id: Joi.string().required() });
    const pathValidation = pathSchema.validate(req.params);
    if (pathValidation.error) {
      res.status(401).send(pathValidation.error);
      return;
    }
    const warehouseId = pathValidation.value.id;
    const service = ServiceLocator.unassignManagerService;
    try {
      await service.unassignManager(warehouseId);
      res.status(201).send({ success: 1 });
    } catch (error) {
      console.log(error);
      const errorRs = errorResponse(error);
      res.status(errorRs.code).send(errorRs.message);
    }
  }
}
