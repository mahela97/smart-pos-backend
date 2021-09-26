import { Request, Response } from "express";
import Joi from "joi";
import ServiceLocator from "../../../utill/serviceLocator";
import { errorResponse } from "../../../utill/responses";

export default class GetCurrentUserHandler {
  public static async getCurrentUser(req: Request, res: Response) {
    const schema = Joi.object({ uid: Joi.string().required() });
    const validation = schema.validate(req.params);
    if (validation.error) {
      res.status(401).send({ message: validation.error.message });
      return;
    }
    const { uid } = validation.value;
    const service = ServiceLocator.getCurrentUserService;
    try {
      const result = await service.getUser(uid);
      res.status(201).send(result);
    } catch (error) {
      const errResponse = errorResponse(error);
      res.status(errResponse.code).send(errResponse.message);
    }
  }
}
