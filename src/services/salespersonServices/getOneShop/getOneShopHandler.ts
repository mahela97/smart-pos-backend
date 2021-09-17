import { Request, Response } from "express";
import Joi from "joi";
import ServiceLocator from "../../../utill/serviceLocator";
import { errorResponse } from "../../../utill/responses";

export default class GetOneShopHandler {
    public static async getOneShop(req: Request, res: Response): Promise<void>{
        const schema = Joi.object({id: Joi.string().required()});
        const validation = schema.validate(req.params);
        if(validation.error){
            res.status(401).send({message:validation.error.message});
            return;
        }
        const {id} = validation.value;
        const service = ServiceLocator.getOneShop;
        try{
            const result = await service.getOneShop(id);
            res.status(201).send({success: 1, result});
        }catch (error){
            const errRes = errorResponse(error);
            res.status(errRes.code).send(errRes.message);
        }

    }
}