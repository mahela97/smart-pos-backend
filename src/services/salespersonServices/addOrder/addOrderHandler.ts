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
    const getOneShopService = ServiceLocator.getOneShop;
    const emailService = ServiceLocator.getEmailService;
    const data: OrderModel = validation.value;
    const shop = await getOneShopService.getOneShop(data.shop);
    const shopEmail = shop.email;
    try {
      const result = await orderService.addOrder(data, emailService, shopEmail);
      res.status(201).send({ id: result });
    } catch (error) {
      console.log(error);
      const errorRes = errorResponse(error);
      res.status(errorRes.code).send(errorRes.response);
    }
  }
}
