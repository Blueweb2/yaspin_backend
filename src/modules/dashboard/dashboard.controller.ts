import { Request, Response } from "express";

import { DashboardService } from "./dashboard.service";

const getDashboardStats =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const result =
        await DashboardService.getDashboardStats();

      res.status(200).json({
        success: true,
        message:
          "Dashboard stats fetched successfully",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Failed to fetch dashboard stats",
      });
    }
  };

const getLatestProjects =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const result =
        await DashboardService.getLatestProjects();

      res.status(200).json({
        success: true,
        message:
          "Latest projects fetched successfully",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Failed to fetch latest projects",
      });
    }
  };

export const DashboardController = {
  getDashboardStats,
  getLatestProjects,
};