import { Request, Response } from "express";
import Joi from "joi";
import ServiceLocator from "../../../utill/serviceLocator";
import { errorResponse } from "../../../utill/responses";
import ProductModel from "../../../models/productModel";

export default class UpdateProductHandler {
  public static async updateProduct(
    req: Request,
    res: Response
  ): Promise<void> {
    const schema = Joi.object({
      name: Joi.string().required(),
      unitPrice: Joi.number().required(),
      description: Joi.string(),
      photo: Joi.string(),
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
    const productId = pathValidation.value.id;
    const productDetails: Partial<ProductModel> = validation.value;
    const service = ServiceLocator.updateProduct;
    try {
      await service.updateProduct(productId, productDetails);
      res.status(201).send({ success: 1 });
    } catch (error) {
      const errorRs = errorResponse(error);
      res.status(errorRs.code).send(errorRs.message);
    }
  }
}
