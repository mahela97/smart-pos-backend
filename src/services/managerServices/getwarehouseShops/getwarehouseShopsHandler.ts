// import Joi from "joi";
// import { Request, Response } from "express";
// import ServiceLocator from "../../../utill/serviceLocator";
// import { errorResponse } from "../../../utill/responses";
//
// export default class GetwarehouseShopsHandler {
//     public static async getWarehouseShops(
//         req: Request,
//         res: Response
//     ): Promise<void> {
//         const pathSchema = Joi.object({ id: Joi.string().required() });
//         const pathValidation = pathSchema.validate(req.params);
//         if (pathValidation.error) {
//             res.status(401).send(pathValidation.error);
//             return;
//         }
//         const { id } = pathValidation.value;
//         const service = ServiceLocator.getWarehouseShops;
//         try {
//             const result = await service.getWarehouseShops(id);
//             res.status(201).send({ shops: result ? result.shops : [] });
//         } catch (error) {
//             const errorRes = errorResponse(error);
//             res.status(errorRes.code).send(errorRes.response);
//         }
//     }
// }
