import express from "express";

import { upload } from "../../config/multer";

import { auth } from "../../middlewares/auth";

import { ServiceController } from "./service.controller";

const router = express.Router();

// PUBLIC ROUTES

router.get(
  "/",
  ServiceController.getAllServices
);

router.get(
  "/:slug",
  ServiceController.getSingleService
);

// ADMIN ROUTES

// router.post(
//   "/",
//   auth,
//   upload.fields([
//     { name: "image" },
//     { name: "icon" },
//   ]),
//   ServiceController.createService
// );

// router.patch(
//   "/:id",
//   auth,
//   upload.single("image"),
//   ServiceController.updateService
// );

// router.delete(
//   "/:id",
//   auth,
//   ServiceController.deleteService
// );
router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "icon", maxCount: 1 },
  ]),
  ServiceController.createService
);

router.patch(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "icon", maxCount: 1 },
  ]),
  ServiceController.updateService
);

router.delete(
  "/:id",
  ServiceController.deleteService
);

export const ServiceRoutes = router;