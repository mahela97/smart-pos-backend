import { Request, Response } from "express";
import Joi from "joi";
import ServiceLocator from "../../../utill/serviceLocator";
import UserModel from "../../../models/userModel";

export default class RegisterUserHandler {
  public static async registerUser(req: Request, res: Response): Promise<void> {
 const schema = Joi.object({
   firstName:Joi.string().required(),
   lastName:Joi.string().required(),
   role:Joi.string().required(),
   email:Joi.string().email().required(),
   telephone:Joi.string().required(),
     warehouseId:Joi.string().allow("")
 });
 const validate = schema.validate(req.body);
 if(validate.error){
   res.status(404).send({message:validate.error.message});
   
 }
 const body:UserModel = validate.value;
 const userService = ServiceLocator.registerWebUser;
 try{
   const result = await userService.registerUser(body);
   res.status(201).send({message:result});
 }catch(error){
   res.status(401).send({message:error.message});
 }
  }
}
