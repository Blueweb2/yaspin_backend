import express from "express";

import { UserController } from "./user.controller";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.post("/", UserController.createUser);

router.get("/", auth, UserController.getAllUsers);

router.get("/:id", auth, UserController.getSingleUser);

router.patch("/:id", auth, UserController.updateUser);

router.delete("/:id", auth, UserController.deleteUser);

export const UserRoutes = router;