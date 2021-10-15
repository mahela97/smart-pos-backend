import { Request, Response } from "express";
import Joi from "joi";
import ServiceLocator from "../../../utill/serviceLocator";
import { errorResponse } from "../../../utill/responses";
import UserModel from "../../../models/userModel";

export default class UpdateUserLocationHandler {
    public static async updateUserLocation(req: Request, res: Response): Promise<void> {
        const schema = Joi.object({
            longitude: Joi.string().required(),
            latitude: Joi.string().required()
        });
        const validation = schema.validate(req.body);
        const pathSchema = Joi.object({ salesperson: Joi.string().required() });
        const pathValidation = pathSchema.validate(req.params);
        if (pathValidation.error) {
            res.status(401).send(pathValidation.error);
            return;
        }
        if (validation.error) {
            res.status(401).send(validation.error.message);
            return;
        }
        const userId = pathValidation.value.salesperson;
        const userState: Partial<UserModel> = validation.value;
        const service = ServiceLocator.updateUserLocation;
        try {
            await service.updateUserLocation(userId, userState);
            res.status(201).send({ success: 1 });
        } catch (error) {
            const errorRs = errorResponse(error);
            res.status(errorRs.code).send(errorRs.message);
        }
    }
}
