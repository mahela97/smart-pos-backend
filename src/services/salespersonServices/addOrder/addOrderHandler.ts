import Joi from "joi";
import { Request, Response } from "express";
import ServiceLocator from "../../../utill/serviceLocator";
import OrderModel from "../../../models/orderModel";
import { errorResponse } from "../../../utill/responses";

export default class AddOrderHandler {
  public static async addOrder(req: Request, res: Response): Promise<void> {
    const schema = Joi.object({
      products: Joi.array().required(),
      shop: Joi.string().required(),
      salesperson: Joi.string().required(),
      totalPrice: Joi.number().required(),
      receivedPrice: Joi.number().required(),
      archived: Joi.boolean().default(false),
    });

    const validation = schema.validate(req.body);
    if (validation.error) {
      res.status(401).send({ message: validation.error.message });
      return;
    }
    const orderService = ServiceLocator.addOrder;
    const data: OrderModel = validation.value;
    try {
      await orderService.addOrder(data);
      res.status(201).send({ result: "success" });
    } catch (error) {
      console.log(error);
      const errorRes = errorResponse(error);
      res.status(errorRes.code).send(errorRes.response);
    }
  }
}
