import { Request, Response } from "express";
import Joi from "joi";
import ServiceLocator from "../../../utill/serviceLocator";
import UserModel from "../../../models/userModel";
import { errorResponse } from "../../../utill/responses";

export default class RegisterUserHandler {
  public static async registerUser(req: Request, res: Response): Promise<void> {
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

    const validate = schema.validate(req.body);
    if (validate.error) {
      res.status(404).send({ message: validate.error.message });
      return;
    }
    const body: UserModel = validate.value;
    const userService = ServiceLocator.registerWebUser;
    const emailService = ServiceLocator.getEmailService;
    try {
      const result = await userService.registerUser(body, emailService);
      res.status(201).send({ message: result });
    } catch (error) {
      const errorRes = errorResponse(error);
      res.status(errorRes.code).send(errorRes.response);
    }
  }
}
