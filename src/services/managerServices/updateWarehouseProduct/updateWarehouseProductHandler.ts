import { Request, Response } from "express";
import Joi from "joi";
import ServiceLocator from "../../../utill/serviceLocator";
import { errorResponse } from "../../../utill/responses";
import ProductObjectModel from "../../../models/productObjectModel";

export default class UpdateWarehouseProductHandler {
  public static async updateWarehouseProduct(
    req: Request,
    res: Response
  ): Promise<void> {
    const schema = Joi.object({
      product: Joi.string().required(),
      quantity: Joi.number().required(),
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
    const warehouseId = pathValidation.value.id;
    const productObject: ProductObjectModel = validation.value;
    const service = ServiceLocator.updateWarehouseProduct;
    try {
      await service.updateWarehouseProduct(warehouseId, productObject);
      res.status(201).send({ success: 1 });
    } catch (error) {
      const errorRs = errorResponse(error);
      res.status(errorRs.code).send(errorRs.message);
    }
  }
}
