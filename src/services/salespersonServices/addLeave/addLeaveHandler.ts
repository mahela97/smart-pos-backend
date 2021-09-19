import Joi from "joi";
import { Request, Response } from "express";
import ServiceLocator from "../../../utill/serviceLocator";
import LeaveModel from "../../../models/leaveModel";
import { errorResponse } from "../../../utill/responses";

export default class AddLeaveHandler {
  public static async addLeave(req: Request, res: Response): Promise<void> {
    const schema = Joi.object({
      userId: Joi.string().required(),
      description: Joi.string().required(),
      approved: Joi.string().required(),
      from: Joi.string().required(),
      to: Joi.string().required(),
      archived: Joi.boolean().default(false),
    });

    const validation = schema.validate(req.body);
    if (validation.error) {
      res.status(401).send({ message: validation.error.message });
      return;
    }
    const leaveService = ServiceLocator.addLeave;
    const data: LeaveModel = validation.value;
    try {
      const result = await leaveService.addLeave(data);
      res.status(201).send({ id: result });
    } catch (error) {
      const errorRes = errorResponse(error);
      res.status(errorRes.code).send(errorRes.response);
    }
  }
}
