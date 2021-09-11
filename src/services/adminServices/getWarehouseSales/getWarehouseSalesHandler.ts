// import { Request, Response } from "express";
// import Joi from "joi";
// import moment from "moment";
// import ServiceLocator from "../../../utill/serviceLocator";
//
// export default class GetWarehouseSalesHandler {
//   public static async getWarehouseSales(req: Request, res: Response) {
//     const querySchema = Joi.object({
//       to: Joi.date().default(moment()),
//       from: Joi.date().default(moment().subtract(1, 'months')),
//     });
//     const validation = querySchema.validate(req.params);
//
//     if (validation.error){
//       res.status(401).send(validation.error.message);
//       return;
//     }
//     const service = ServiceLocator.
//     const {to,from} = validation.value;
//     try{
//
//     }catch(error){
//
//     }
//   }
// }
