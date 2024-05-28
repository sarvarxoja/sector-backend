import { Router } from "express";
import tokenMiddleware from "../Middleware/token.middleware.js";
import authController from "../Controller/auth.controller.js";
import authMiddleware from "../Middleware/auth.middleware.js";

export const auth_router = Router();

auth_router
  .post(
    "/register",
    tokenMiddleware.checkSuperAdminToken,
    authMiddleware.registerMiddleware,
    authController.authRegister
  )
  .post("/login", authMiddleware.checkLogin, authController.authLogin)
  .get("/token", tokenMiddleware.checkToken);
