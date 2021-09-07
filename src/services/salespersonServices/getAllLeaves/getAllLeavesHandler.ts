import Joi from "joi";
import {Request, Response} from "express";
import { errorResponse } from "../../../utill/responses";
import ServiceLocator from "../../../utill/serviceLocator";

export default class GetAllLeavesHandler{
    public static async getAllLeaves(req:Request,res:Response):Promise<void>{
        const schema = Joi.object({
            query: Joi.string().allow("").default(""),
            sortBy: Joi.string(),
            page: Joi.number().default(1),
            limit: Joi.number().default(10),
            filter: Joi.string().allow("").default(""),
        });

        const validation  = schema.validate(req.query);
        if(validation.error){
            res.status(401).send({message:validation.error.message});
            return;
        }
        const data = validation.value;
        const service = ServiceLocator.getAllLeaves;
        try{
            const result = await service.getAllLeaves(data);
            res.status(201).send({
                totalItems: result.total,
                items: result.items,
            });
        }catch(error){
            console.log(error);
            const errorRes = errorResponse(error);
            res.status(errorRes.code).send(errorRes.response);
        }

    }
}