import { Router } from "express";
import userController from "../Controller/user.controller.js";
import tokenMiddleware from "../Middleware/token.middleware.js";

export const user_router = Router();

user_router
  .get("/all", userController.getUsers)
  .delete(
    "/:id",
    tokenMiddleware.checkSuperAdminToken,
    userController.userDelete
  );
