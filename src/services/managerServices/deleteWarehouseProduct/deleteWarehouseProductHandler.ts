import Joi from "joi";
import { Request, Response } from "express";
import ServiceLocator from "../../../utill/serviceLocator";
import { errorResponse } from "../../../utill/responses";

export default class DeleteWarehouseProductHandler {
    public static async deleteWarehouseProduct(req: Request, res: Response): Promise<void> {
        const schema = Joi.object({ warehouseId: Joi.string().required() , productId: Joi.string().required() });
        const validation = schema.validate(req.params);
        if (validation.error) {
            res.status(401).send({ message: validation.error.message });
            return;
        }
        const { warehouseId, productId } = validation.value;
        const service = ServiceLocator.deleteWarehouseProduct;
        try {
            const result = await service.deleteWarehouseProduct(warehouseId, productId);
            res.status(201).send({ success: 1, result });
        } catch (error) {
            const errRes = errorResponse(error);
            res.status(errRes.code).send(errRes.message);
        }
    }
}
