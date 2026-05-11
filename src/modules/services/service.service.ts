import slugify from "slugify";

import { IService } from "./service.interface";

import { Service } from "./service.model";

const createService = async (
  payload: IService
) => {
  // auto generate slug
  payload.slug = slugify(payload.title, {
    lower: true,
    strict: true,
    trim: true,
  });

  // unique slug check
  const existing = await Service.findOne({
    slug: payload.slug,
  });

  if (existing) {
    payload.slug = `${payload.slug}-${Date.now()}`;
  }

  return await Service.create(payload);
};

const getAllServices = async () => {
  return await Service.find({
    isActive: true,
  }).sort({
    order: 1,
    createdAt: -1,
  });
};

const getSingleService = async (
  slug: string
) => {
  return await Service.findOne({
    slug,
  });
};

const updateService = async (
  id: string,
  payload: Partial<IService>
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
      await Service.findOne({
        slug: generatedSlug,
        _id: { $ne: id },
      });

    if (existing) {
      generatedSlug = `${generatedSlug}-${Date.now()}`;
    }

    payload.slug = generatedSlug;
  }

  return await Service.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
    }
  );
};

const deleteService = async (
  id: string
) => {
  return await Service.findByIdAndDelete(
    id
  );
};

export const ServiceService = {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
};