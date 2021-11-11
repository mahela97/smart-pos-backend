import Joi from "joi";
import { Request, Response } from "express";
import { errorResponse } from "../../../utill/responses";
import ServiceLocator from "../../../utill/serviceLocator";

export default class GetLeavesHandler {
  public static async getLeaves(req: Request, res: Response): Promise<void> {
    const schema = Joi.object({
      query: Joi.string().allow("").default(""),
      sortBy: Joi.string(),
      page: Joi.number().default(1),
      limit: Joi.number().default(100),
      filter: Joi.string().allow("").default(""),
    });

    const validation = schema.validate(req.query);
    if (validation.error) {
      res.status(401).send({ message: validation.error.message });
      return;
    }
    const data = validation.value;
    const uid = req.user?.uid;
    const service = ServiceLocator.getLeaves;
    try {
      const result = await service.getLeaves(data, uid);
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
