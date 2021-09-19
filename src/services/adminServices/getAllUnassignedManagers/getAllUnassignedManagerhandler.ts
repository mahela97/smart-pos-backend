import { Request, Response } from "express";
import ServiceLocator from "../../../utill/serviceLocator";
import { errorResponse } from "../../../utill/responses";

export default class GetAllUnassignedManagerHandler {
  public static async getAllUnassignedManagers(req: Request, res: Response) {
    const service = ServiceLocator.getUnassignedManagers;
    try {
      const result = await service.getAllUnassignedManagers();
      res.status(201).send({
        result,
      });
    } catch (error) {
      console.log(error);
      const errorRes = errorResponse(error);
      res.status(errorRes.code).send(errorRes.response);
    }
  }
}
