import express from "express";

import { requireAdmin, requireAuthOrInitialAdmin } from "../../middlewares/requireAdmin";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  loginValidationSchema,
  registerUserValidationSchema,
  registerAdminValidationSchema,
} from "./auth.validation";
import { AuthController } from "./auth.controller";

const router = express.Router();

router.post(
  "/register",
  validateRequest(registerUserValidationSchema),
  AuthController.registerUser
);
router.post(
  "/register-admin",
  requireAuthOrInitialAdmin,
  requireAdmin,
  validateRequest(registerAdminValidationSchema),
  AuthController.registerAdmin
);
router.post(
  "/login",
  validateRequest(loginValidationSchema),
  AuthController.loginUser
);

export const AuthRoutes = router;