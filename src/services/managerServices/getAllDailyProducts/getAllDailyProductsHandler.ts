import { Request, Response } from "express";
import Joi from "joi";
import moment from "moment";
import ServiceLocator from "../../../utill/serviceLocator";
import { errorResponse } from "../../../utill/responses";

export default class GetAllDailyProductsHandler {
  public static async getAllDailyProducts(
    req: Request,
    res: Response
  ): Promise<void> {
    const querySchema = Joi.object({
      date: Joi.date().required(),
    });
    const validate = querySchema.validate(req.query);
    if (validate.error) {
      res.status(404).send(validate.error.message);
      return;
    }
    const schema = Joi.object({ id: Joi.string().required() });
    const validation = schema.validate(req.params);
    if (validation.error) {
      res.status(401).send({ message: validation.error.message });
      return;
    }
    const { date } = validate.value;
    const startDate = moment(date).subtract(1, "day").startOf("day");
    const endDate = moment(date).subtract(1, "day").endOf("day");
    const { id } = validation.value;
    const service = ServiceLocator.getAllDailyProducts;
    try {
      const result = await service.getAllDailyProducts(id, startDate, endDate);
      res.status(201).send({ dailyProducts: result? result.dailyProducts: [] });
    } catch (error) {
      const errorRes = errorResponse(error);
      res.status(errorRes.code).send(errorRes.message);
    }
  }
}
