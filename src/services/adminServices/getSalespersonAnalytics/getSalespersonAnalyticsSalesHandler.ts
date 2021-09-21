import { Request, Response } from "express";
import Joi from "joi";
import moment from "moment";
import ServiceLocator from "../../../utill/serviceLocator";
import { errorResponse } from "../../../utill/responses";

export default class GetSalespersonAnalyticsSalesHandler {
  public static async getAnalytics(req: Request, res: Response): Promise<void> {
    const querySchema = Joi.object({
      startDate: Joi.date().default(
        moment().subtract(5, "days").startOf("day")
      ),
      endDate: Joi.date().default(moment().subtract(1, "days").endOf("day")),
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
    const { startDate, endDate } = validate.value;
    const { id } = validation.value;
    const service = ServiceLocator.getSalespersoAnalyticsService;
    try {
      const result = await service.getAnalyticsSalesSalesperson(
        id,
        startDate,
        endDate
      );
      res.status(201).send(result);
    } catch (error) {
      const errorRes = errorResponse(error);
      res.status(errorRes.code).send(errorRes.message);
    }
  }
}
