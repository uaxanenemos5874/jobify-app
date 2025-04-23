import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../middlewares/validation.middleware.js";
const authRouter = Router();

authRouter.post("/register", validateRegisterInput, register);
authRouter.post("/login", validateLoginInput, login);
authRouter.get("/logout", logout);

export default authRouter;
