import Joi from "joi";
import {Request, Response} from "express";
import ServiceLocator from "../../../utill/serviceLocator";
import ProductModel from "../../../models/productModel";
import {errorResponse} from "../../../utill/responses";

export default class AddProductHandler {
    public static async addProduct(req: Request, res: Response): Promise<void> {

        const schema = Joi.object({
            name: Joi.string().required(),
            categoryId: Joi.string().required(),
            unitPrice: Joi.number().required(),
            description: Joi.string(),
            photo: Joi.string().required(),
            archived: Joi.boolean().default(false)
        });

        const validation = schema.validate(req.body);
        if (validation.error) {
            res.status(401).send({message: validation.error.message});
            return;
        }
        const productService = ServiceLocator.addProduct;
        const data: ProductModel = validation.value;
        try {
            const result = await productService.addProduct(data);
            res.status(201).send({id: result});
        } catch (error) {
            const errorRes = errorResponse(error);
            res.status(errorRes.code).send(errorRes.response);
        }

    }
}