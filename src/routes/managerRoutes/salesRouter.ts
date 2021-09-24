import { Router } from "express";

const salesRouter = Router();

salesRouter.route("/").get();

export default salesRouter;
