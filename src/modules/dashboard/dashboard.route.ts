import express from "express";

import { DashboardController } from "./dashboard.controller";

const router = express.Router();

router.get(
  "/stats",
  DashboardController.getDashboardStats
);

router.get(
  "/latest-projects",
  DashboardController.getLatestProjects
);

export const DashboardRoutes =
  router;