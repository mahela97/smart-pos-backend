import Joi from "joi";
import { Request, Response } from "express";
import ServiceLocator from "../../../utill/serviceLocator";
import CategoryModel from "../../../models/categoryModel";
import { errorResponse } from "../../../utill/responses";

export default class AddCategoryHandler {
  public static async addCategory(req: Request, res: Response): Promise<void> {
    const schema = Joi.object({
      name: Joi.string().required(),
      archived: Joi.boolean().default(false),
    });

    const validation = schema.validate(req.body);
    if (validation.error) {
      res.status(401).send({ message: validation.error.message });
      return;
    }
    const categoryService = ServiceLocator.addCategory;
    const data: CategoryModel = validation.value;
    try {
      const result = await categoryService.addCategory(data);
      res.status(201).send({ id: result });
    } catch (error) {
      const errorRes = errorResponse(error);
      res.status(errorRes.code).send(errorRes.response);
    }
  }
}
