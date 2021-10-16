import { Request, Response } from "express";
import Joi from "joi";
import ServiceLocator from "../../../utill/serviceLocator";
import UserModel from "../../../models/userModel";
import { errorResponse } from "../../../utill/responses";

export default class EditUserHandler {
  public static async editUser(req: Request, res: Response): Promise<void> {
    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      role: Joi.string().required(),
      uid: Joi.string().required(),
      email: Joi.string().email().required(),
      telephone: Joi.string().required(),
      warehouseId: Joi.string().allow(""),
      password: Joi.string(),
      rePassword: Joi.string(),
    });
    const pathSchema = Joi.object({ id: Joi.string().required() });
    const validate = schema.validate(req.body);
    if (validate.error) {
      res.status(404).send({ message: validate.error.message });
      return;
    }

    const pathValidation = pathSchema.validate(req.params);
    if (pathValidation.error) {
      res.status(401).send(pathValidation.error);
      return;
    }
    const body: UserModel = validate.value;
    const userId = pathValidation.value.id;
    const userService = ServiceLocator.editWebUser;
    try {
      const result = await userService.editUser(userId, body);
      res.status(201).send({ message: result });
    } catch (error) {
      const errorRes = errorResponse(error);
      res.status(errorRes.code).send(errorRes.response);
    }
  }
}
