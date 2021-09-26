import { Request, Response } from "express";
import Joi from "joi";
import ServiceLocator from "../../../utill/serviceLocator";
import { errorResponse } from "../../../utill/responses";
import LeaveModel from "../../../models/leaveModel";

export default class UpdateLeaveHandler {
  public static async updateLeave(req: Request, res: Response): Promise<void> {
    const schema = Joi.object({
      approved: Joi.string().required(),
    });
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
    const leaveId = pathValidation.value.id;
    const leaveState: Partial<LeaveModel> = validation.value;
    const service = ServiceLocator.updateLeave;
    try {
      await service.updateLeave(leaveId, leaveState);
      res.status(201).send({ success: 1 });
    } catch (error) {
      const errorRs = errorResponse(error);
      res.status(errorRs.code).send(errorRs.message);
    }
  }
}
