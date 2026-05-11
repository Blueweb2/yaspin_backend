import { Request, Response } from "express";

import sendImageToCloudinary from "../../utils/sendImageToCloudinary";

import { ProjectService } from "./project.service";

// =========================
// CREATE PROJECT
// =========================

const createProject = async (
  req: Request,
  res: Response
) => {
  try {
    let thumbnailUrl = "";

    let galleryUrls: string[] = [];

    const files = req.files as {
      [fieldname: string]:
        Express.Multer.File[];
    };

    // =========================
    // THUMBNAIL UPLOAD
    // =========================

    if (files?.thumbnail?.[0]) {
      const uploadedThumbnail =
        await sendImageToCloudinary(
          `${req.body.title}-thumbnail`,
          files.thumbnail[0].buffer,
          "yaspin/projects/thumbnails"
        );

      thumbnailUrl =
        uploadedThumbnail.secure_url;
    }

    // =========================
    // GALLERY UPLOADS
    // =========================

    if (
      files?.gallery &&
      files.gallery.length > 0
    ) {
      const uploadedGallery =
        await Promise.all(
          files.gallery.map(
            async (file, index) => {
              const uploaded =
                await sendImageToCloudinary(
                  `${req.body.title}-gallery-${index}`,
                  file.buffer,
                  "yaspin/projects/gallery"
                );

              return uploaded.secure_url;
            }
          )
        );

      galleryUrls = uploadedGallery;
    }

    // =========================
    // PAYLOAD
    // =========================

    const payload = {
      ...req.body,

      thumbnail: thumbnailUrl,

      gallery: galleryUrls,

      technologies: req.body
        .technologies
        ? JSON.parse(
            req.body.technologies
          )
        : [],

      features: req.body.features
        ? JSON.parse(req.body.features)
        : [],
    };

    const result =
      await ProjectService.createProject(
        payload
      );

    res.status(201).json({
      success: true,

      message:
        "Project created successfully",

      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,

      message: error.message,
    });
  }
};

// =========================
// GET ALL PROJECTS
// =========================

const getAllProjects = async (
  req: Request,
  res: Response
) => {
  try {
    const result =
      await ProjectService.getAllProjects();

    res.status(200).json({
      success: true,

      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,

      message: error.message,
    });
  }
};

// =========================
// GET FEATURED PROJECTS
// =========================

const getFeaturedProjects =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const result =
        await ProjectService.getFeaturedProjects();

      res.status(200).json({
        success: true,

        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,

        message: error.message,
      });
    }
  };

// =========================
// GET SINGLE PROJECT
// =========================

const getSingleProject = async (
  req: Request,
  res: Response
) => {
  try {
    const slug = String(
      req.params.slug
    );

    const result =
      await ProjectService.getSingleProject(
        slug
      );

    res.status(200).json({
      success: true,

      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,

      message: error.message,
    });
  }
};

// =========================
// UPDATE PROJECT
// =========================

const updateProject = async (
  req: Request,
  res: Response
) => {
  try {
    const id = String(req.params.id);

    let thumbnailUrl =
      req.body.thumbnail;

    let galleryUrls =
      req.body.gallery || [];

    const files = req.files as {
      [fieldname: string]:
        Express.Multer.File[];
    };

    // =========================
    // UPDATE THUMBNAIL
    // =========================

    if (files?.thumbnail?.[0]) {
      const uploadedThumbnail =
        await sendImageToCloudinary(
          `${req.body.title}-thumbnail`,
          files.thumbnail[0].buffer,
          "yaspin/projects/thumbnails"
        );

      thumbnailUrl =
        uploadedThumbnail.secure_url;
    }

    // =========================
    // UPDATE GALLERY
    // =========================

    if (
      files?.gallery &&
      files.gallery.length > 0
    ) {
      const uploadedGallery =
        await Promise.all(
          files.gallery.map(
            async (file, index) => {
              const uploaded =
                await sendImageToCloudinary(
                  `${req.body.title}-gallery-${index}`,
                  file.buffer,
                  "yaspin/projects/gallery"
                );

              return uploaded.secure_url;
            }
          )
        );

      galleryUrls = uploadedGallery;
    }

    // =========================
    // PAYLOAD
    // =========================

    const payload = {
      ...req.body,

      thumbnail: thumbnailUrl,

      gallery: galleryUrls,

      technologies: req.body
        .technologies
        ? JSON.parse(
            req.body.technologies
          )
        : [],

      features: req.body.features
        ? JSON.parse(req.body.features)
        : [],
    };

    const result =
      await ProjectService.updateProject(
        id,
        payload
      );

    res.status(200).json({
      success: true,

      message:
        "Project updated successfully",

      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,

      message: error.message,
    });
  }
};

// =========================
// DELETE PROJECT
// =========================

const deleteProject = async (
  req: Request,
  res: Response
) => {
  try {
    const id = String(req.params.id);

    await ProjectService.deleteProject(
      id
    );

    res.status(200).json({
      success: true,

      message:
        "Project deleted successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,

      message: error.message,
    });
  }
};

export const ProjectController = {
  createProject,

  getAllProjects,

  getFeaturedProjects,

  getSingleProject,

  updateProject,

  deleteProject,
};