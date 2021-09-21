import { Request, Response } from "express";
import Joi from "joi";
import moment from "moment";
import ServiceLocator from "../../../utill/serviceLocator";
import { errorResponse } from "../../../utill/responses";

export default class GetSalespersonAnalyticsProdutcsDateHandler {
  public static async getAnalytics(req: Request, res: Response): Promise<void> {
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
    const startDate = moment(date).startOf("day");
    const endDate = moment(date).endOf("day");
    const { id } = validation.value;
    const service = ServiceLocator.getSalespersonAnalyticsProductsDateService;
    try {
      const result = await service.getAnalyticsSalesSalesperson(
        id,
        startDate,
        endDate
      );
      res.status(201).send({ products: result });
    } catch (error) {
      const errorRes = errorResponse(error);
      res.status(errorRes.code).send(errorRes.message);
    }
  }
}
