import { Request, Response } from "express";
import Joi from "joi";
import ServiceLocator from "../../../utill/serviceLocator";
import ShopModel from "../../../models/shopModel";
import {errorResponse} from "../../../utill/responses";


export default class AddShopHandler {
    public static async addShop(req: Request, res: Response): Promise<void> {
        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            telephone: Joi.string().required(),
            location: Joi.string().required(),
            longitude: Joi.string().required(),
            latitude: Joi.string().required(),
            ownerName: Joi.string().required(),
            address: Joi.string().required(),
            archived: Joi.string().default(false)
        });

        const validation = schema.validate(req.body);
        if(validation.error){
            res.status(401).send({message: validation.error.message});
            return;
        }

        const shopService = ServiceLocator.addShop;
        const data: ShopModel = validation.value;
        try{
            const result = await shopService.addShop(data);
            res.status(201).send({id: result});
        }catch(error){
            const errorRes = errorResponse(error);
            res.status(errorRes.code).send(errorRes.response);
        }

    }
}