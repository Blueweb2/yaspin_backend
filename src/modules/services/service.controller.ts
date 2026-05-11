import { Request, Response } from "express";

import sendImageToCloudinary from "../../utils/sendImageToCloudinary";

import { ServiceService } from "./service.service";

const createService = async (
  req: Request,
  res: Response
) => {
  try {
    let imageUrl = "";
    let iconUrl = "";

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    } | undefined;

    // image upload
    if (files?.image?.[0]) {
      const uploadedImage =
        await sendImageToCloudinary(
          req.body.title,
          files.image[0].buffer,
          "yaspin/services"
        );

      imageUrl =
        uploadedImage.secure_url;
    }

    // svg icon upload
    if (files?.icon?.[0]) {
      const uploadedIcon =
        await sendImageToCloudinary(
          `${req.body.title}-icon`,
          files.icon[0].buffer,
          "yaspin/service-icons"
        );

      iconUrl =
        uploadedIcon.secure_url;
    }

    const payload = {
      ...req.body,
      image: imageUrl,
      icon: iconUrl,
    };

    const result =
      await ServiceService.createService(
        payload
      );

    res.status(201).json({
      success: true,
      message:
        "Service created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllServices = async (
  req: Request,
  res: Response
) => {
  try {
    const result =
      await ServiceService.getAllServices();

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

const getSingleService = async (
  req: Request,
  res: Response
) => {
  try {
    const slug = String(req.params.slug);

    const result =
      await ServiceService.getSingleService(
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
const updateService = async (
  req: Request,
  res: Response
) => {
  try {
    const id = String(req.params.id);

    let imageUrl = req.body.image;
    let iconUrl = req.body.icon;

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    } | undefined;

    // update image
    if (files?.image?.[0]) {
      const uploadedImage =
        await sendImageToCloudinary(
          req.body.title ||
            "service-image",
          files.image[0].buffer,
          "yaspin/services"
        );

      imageUrl =
        uploadedImage.secure_url;
    }

    // update svg icon
    if (files?.icon?.[0]) {
      const uploadedIcon =
        await sendImageToCloudinary(
          `${req.body.title}-icon`,
          files.icon[0].buffer,
          "yaspin/service-icons"
        );

      iconUrl =
        uploadedIcon.secure_url;
    }

    const payload = {
      ...req.body,
      image: imageUrl,
      icon: iconUrl,
    };

    const result =
      await ServiceService.updateService(
        id,
        payload
      );

    res.status(200).json({
      success: true,
      message:
        "Service updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteService = async (
  req: Request,
  res: Response
) => {
  try {
    const id = String(req.params.id);

    await ServiceService.deleteService(
      id
    );

    res.status(200).json({
      success: true,
      message:
        "Service deleted successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const ServiceController = {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
};