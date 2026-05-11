import express from "express";

import { upload } from "../../config/multer";

import { ProjectController } from "./project.controller";

const router = express.Router();

// PUBLIC

router.get(
  "/featured",
  ProjectController.getFeaturedProjects
);

router.get(
  "/",
  ProjectController.getAllProjects
);

router.get(
  "/:slug",
  ProjectController.getSingleProject
);

// ADMIN

router.post(
  "/",
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "gallery",
      maxCount: 10,
    },
  ]),
  ProjectController.createProject
);

router.patch(
  "/:id",
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "gallery",
      maxCount: 10,
    },
  ]),
  ProjectController.updateProject
);

router.delete(
  "/:id",
  ProjectController.deleteProject
);

export const ProjectRoutes = router;