import slugify from "slugify";

import { IProject } from "./project.interface";

import { Project } from "./project.model";

// =========================
// CREATE PROJECT
// =========================

const createProject = async (
  payload: IProject
) => {
  // auto generate slug

  payload.slug = slugify(
    payload.title,
    {
      lower: true,
      strict: true,
      trim: true,
    }
  );

  // unique slug check

  const existing =
    await Project.findOne({
      slug: payload.slug,
    });

  if (existing) {
    payload.slug = `${payload.slug}-${Date.now()}`;
  }

  return await Project.create(
    payload
  );
};

// =========================
// GET ALL PROJECTS
// =========================

const getAllProjects = async () => {
  return await Project.find().sort({
    order: 1,

    createdAt: -1,
  });
};

// =========================
// GET FEATURED PROJECTS
// =========================

const getFeaturedProjects =
  async () => {
    return await Project.find({
      featured: true,
    }).sort({
      order: 1,
    });
  };

// =========================
// GET SINGLE PROJECT
// =========================

const getSingleProject = async (
  slug: string
) => {
  return await Project.findOne({
    slug,
  });
};

// =========================
// UPDATE PROJECT
// =========================

const updateProject = async (
  id: string,
  payload: Partial<IProject>
) => {
  // regenerate slug if title changes

  if (payload.title) {
    let generatedSlug = slugify(
      payload.title,
      {
        lower: true,
        strict: true,
        trim: true,
      }
    );

    // unique slug check

    const existing =
      await Project.findOne({
        slug: generatedSlug,

        _id: { $ne: id },
      });

    if (existing) {
      generatedSlug = `${generatedSlug}-${Date.now()}`;
    }

    payload.slug =
      generatedSlug;
  }

  return await Project.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
    }
  );
};

// =========================
// DELETE PROJECT
// =========================

const deleteProject = async (
  id: string
) => {
  return await Project.findByIdAndDelete(
    id
  );
};

export const ProjectService = {
  createProject,

  getAllProjects,

  getFeaturedProjects,

  getSingleProject,

  updateProject,

  deleteProject,
};