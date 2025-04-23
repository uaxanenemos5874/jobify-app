import { Router } from "express";
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/user.controller.js";
import { validateUpdatedUser } from "../middlewares/validation.middleware.js";
import {
  authorizePermissions,
  checkForTestUser,
} from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const userRouter = Router();

userRouter.get("/current-user", getCurrentUser);
userRouter.get(
  "/admin/app-stats",
  authorizePermissions("admin"),
  getApplicationStats
);
userRouter.patch(
  "/update-user",
  checkForTestUser,
  upload.single("avatar"),
  validateUpdatedUser,
  updateUser
);

export default userRouter;
