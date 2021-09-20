import Joi from "joi";
import { Request, Response } from "express";
import ServiceLocator from "../../../utill/serviceLocator";
import { errorResponse } from "../../../utill/responses";
import ProductObjectModel from "../../../models/productObjectModel";

export default class AddWarehouseProductHandler {
  public static async addWarehouseProduct(
    req: Request,
    res: Response
  ): Promise<void> {
    const schema = Joi.object({
      product: Joi.string().required(),
      quantity: Joi.number().required(),
    });

    const pathSchema = Joi.object({ id: Joi.string().required() });
    const pathValidation = pathSchema.validate(req.params);
    if (pathValidation.error) {
      res.status(401).send(pathValidation.error);
      return;
    }
    const validation = schema.validate(req.body);
    if (validation.error) {
      res.status(401).send({ message: validation.error.message });
      return;
    }
    const service = ServiceLocator.addWarehouseProduct;
    const warehouseId = pathValidation.value.id;
    const warehouseProduct: ProductObjectModel = validation.value;
    try {
      const result = await service.addWarehouseProduct(
        warehouseId,
        warehouseProduct
      );
      res.status(201).send({ id: result });
    } catch (error) {
      const errorRes = errorResponse(error);
      res.status(errorRes.code).send(errorRes.response);
    }
  }
}
