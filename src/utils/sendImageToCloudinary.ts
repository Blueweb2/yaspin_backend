import { UploadApiResponse } from "cloudinary";

import cloudinary from "../config/cloudinary";

const sendImageToCloudinary = async (
  imageName: string,
  buffer: Buffer,
  folder: string
): Promise<UploadApiResponse> => {
  return new Promise(
    (resolve, reject) => {
      const stream =
        cloudinary.uploader.upload_stream(
          {
            folder,
            public_id: imageName,
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