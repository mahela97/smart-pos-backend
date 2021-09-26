import { Request, Response } from "express";
import Joi from "joi";
import moment from "moment";
import ServiceLocator from "../../../utill/serviceLocator";
import { errorResponse } from "../../../utill/responses";

export default class GetSalespersonsIncomeOrderHandler {
  public static async getAnalytics(req: Request, res: Response): Promise<void> {
    const querySchema = Joi.object({
      startDate: Joi.date().default(
        moment().subtract(5, "days").startOf("day")
      ),
      endDate: Joi.date().default(moment().endOf("day")),
      order: Joi.string().default("dsc"),
    });
    const validate = querySchema.validate(req.query);
    if (validate.error) {
      res.status(404).send(validate.error.message);
      return;
    }
    const { startDate, endDate, order } = validate.value;
    const service = ServiceLocator.getSalespersonsIncomeOrderService;
    try {
      const result = await service.getIncomeanalytics(
        startDate,
        endDate,
        order
      );

      res.status(201).send({ incomes: result });
    } catch (error) {
      const errorRes = errorResponse(error);
      res.status(errorRes.code).send(errorRes.message);
    }
  }
}
