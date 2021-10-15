import { Request, Response } from "express";
import Joi from "joi";
import ServiceLocator from "../../../utill/serviceLocator";
import { errorResponse } from "../../../utill/responses";
import OrderModel from "../../../models/orderModel";

export default class UpdateShopOrderDueAmountHandler {
  public static async updateShopOrderDueAmount(
    req: Request,
    res: Response
  ): Promise<void> {
    const schema = Joi.object({
      receivedPrice: Joi.number().required(),
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
    const orderId = pathValidation.value.id;
    const orderState: Partial<OrderModel> = validation.value;
    const service = ServiceLocator.updateShopOrderDueAmount;
    try {
      await service.updateShopOrderDueAmount(orderId, orderState);
      res.status(201).send({ success: 1 });
    } catch (e) {
      const errorRs = errorResponse(e);
      res.status(errorRs.code).send(errorRs.message);
    }
  }
}
