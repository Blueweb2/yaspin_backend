import { UploadApiResponse } from "cloudinary";

import cloudinary from "../config/cloudinary";

const sendImageToCloudinary = async (
  imageName: string,
  buffer: Buffer,
  folder: string
): Promise<UploadApiResponse> => {
  // SANITIZE IMAGE NAME

  const sanitizedImageName =
    imageName
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

  return new Promise(
    (resolve, reject) => {
      const stream =
        cloudinary.uploader.upload_stream(
          {
            folder,
            public_id:
              sanitizedImageName,
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(
                result as UploadApiResponse
              );
            }
          }
        );

      stream.end(buffer);
    }
  );
};

export default sendImageToCloudinary;