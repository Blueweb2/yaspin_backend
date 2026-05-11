import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import { AuthRoutes } from "./modules/auth/auth.routes";
import { UserRoutes } from "./modules/users/user.routes";
import { ProjectRoutes } from "./modules/projects/project.routes";
import { ServiceRoutes } from "./modules/services/service.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/projects", ProjectRoutes);
app.use(
  "/api/v1/services",
  ServiceRoutes
);

app.get("/", (req, res) => {
  res.send("API Running...");
});

export default app;