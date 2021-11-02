import { Router } from "express";
import GetLeavesHandler from "../../services/managerServices/getLeaves/getLeavesHandler";
import UpdateLeaveHandler from "../../services/managerServices/updateLeave/updateLeavesHandler";

const leavesRouter = Router();

leavesRouter.route("/").get(GetLeavesHandler.getLeaves);
leavesRouter.route("/:id").patch(UpdateLeaveHandler.updateLeave);

export default leavesRouter;
