import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../middlewares/validation.middleware.js";
const authRouter = Router();

import rateLimiter from "express-rate-limit";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    msg: "IP rate-limit exceeded! TRY AGAIN IN 15 MINUTES ⚠️⏱️",
  },
});

authRouter.post("/register", apiLimiter, validateRegisterInput, register);
authRouter.post("/login", apiLimiter, validateLoginInput, login);
authRouter.get("/logout", logout);

export default authRouter;
