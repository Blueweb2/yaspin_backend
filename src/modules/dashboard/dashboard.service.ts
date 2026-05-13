import { Project } from "../projects/project.model";
import { Service } from "../services/service.model";
import { User } from "../users/user.model";

const getDashboardStats = async () => {
  const totalProjects =
    await Project.countDocuments();

  const totalServices =
    await Service.countDocuments();

  const totalUsers =
    await User.countDocuments();

  return {
    projects: totalProjects,
    services: totalServices,
    users: totalUsers,
  };
};

const getLatestProjects =
  async () => {
    const projects =
      await Project.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select(
          "title category status"
        );

    return projects;
  };

export const DashboardService = {
  getDashboardStats,
  getLatestProjects,
};