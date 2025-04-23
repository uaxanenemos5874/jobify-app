import { Router } from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getSingleJob,
  showStats,
  updateJob,
} from "../controllers/job.controller.js";
import {
  validateIdParams,
  validateJobInput,
} from "../middlewares/validation.middleware.js";
import { checkForTestUser } from "../middlewares/auth.middleware.js";
const jobRouter = Router();

jobRouter.get("/", getAllJobs);
jobRouter.get("/stats", showStats);
jobRouter.get("/:id", validateIdParams, getSingleJob);
jobRouter.post("/", checkForTestUser, validateJobInput, createJob);
jobRouter.patch(
  "/:id",
  checkForTestUser,
  validateIdParams,
  validateJobInput,
  updateJob
);
jobRouter.delete("/:id", checkForTestUser, validateIdParams, deleteJob);

export default jobRouter;
