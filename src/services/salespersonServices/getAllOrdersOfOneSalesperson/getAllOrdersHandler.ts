import Joi from "joi";
import { Request, Response } from "express";
import { errorResponse } from "../../../utill/responses";
import ServiceLocator from "../../../utill/serviceLocator";

export default class GetAllOrdersOfOneSalespersonHandler {
  public static async getAllOrders(req: Request, res: Response): Promise<void> {
    // Query Params
    const schema = Joi.object({
      query: Joi.string().allow("").default(""),
      sortBy: Joi.string().required(),
      page: Joi.number().default(1),
      filter: Joi.string().allow("").default(""),
    });

    const validation = schema.validate(req.query);

    if (validation.error) {
      res.status(401).send({ message: validation.error.message });
      return;
    }
    const data = validation.value;
    console.log(data);
    // Path params
    const pathSchema = Joi.object({ id: Joi.string().required() });
    const pathValidation = pathSchema.validate(req.params);
    if (pathValidation.error) {
      res.status(401).send(pathValidation.error);
      return;
    }
    const { id } = pathValidation.value;
    console.log(id);
    const service = ServiceLocator.getAllOrdersOfOneSalesperson;
    try {
      const result = await service.getAllOrdersOfOneSalesperson(data, id);
      res.status(201).send({
        sucess: 1,
        result,
      });
    } catch (e) {
      const errorRes = errorResponse(e);
      res.status(errorRes.code).send(errorRes.response);
    }
  }
}
