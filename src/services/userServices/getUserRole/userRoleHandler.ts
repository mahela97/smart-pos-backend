import { Request, Response } from "express";
import Joi from "joi";
import ServiceLocator from "../../../utill/serviceLocator";
import { errorResponse } from "../../../utill/responses";

export default class GetUserRoleHandler {
  public static async getUser(req: Request, res: Response): Promise<void> {
    const schema = Joi.object({ uid: Joi.string().required() });
    const validation = schema.validate(req.query);
    if (validation.error) {
      res.status(401).send(validation.error.message);
      return;
    }
    const { uid } = validation.value;
    const service = ServiceLocator.getUserRole;
    try {
      const role = await service.getUser(uid);
      res.status(201).send({ role });
    } catch (error) {
      const err = errorResponse(error);
      res.status(err.code).send(err.message);
    }
  }
}
