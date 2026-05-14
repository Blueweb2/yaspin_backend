// src/config/env.ts

import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  port: string;

  MONGO_URI: string;

  node_env: string;

  jwt_access_secret: string;

  jwt_access_expires_in: string;

  bcrypt_salt_rounds: string;

  cloudinary_cloud_name: string;

  cloudinary_api_key: string;

  cloudinary_api_secret: string;

  smtp_host: string;

  smtp_port: string;

  smtp_user: string;

  smtp_pass: string;

  email_from: string;

  contact_receiver_email: string;
}

const env: EnvConfig = {
  port: process.env.PORT || "5000",

  MONGO_URI:
    process.env.MONGO_URI || "",

  node_env:
    process.env.NODE_ENV || "development",

  jwt_access_secret:
    process.env.JWT_ACCESS_SECRET || "",

  jwt_access_expires_in:
    process.env.JWT_ACCESS_EXPIRES_IN ||
    "7d",

  bcrypt_salt_rounds:
    process.env.BCRYPT_SALT_ROUNDS ||
    "10",

  cloudinary_cloud_name:
    process.env
      .CLOUDINARY_CLOUD_NAME || "",

  cloudinary_api_key:
    process.env.CLOUDINARY_API_KEY ||
    "",

  cloudinary_api_secret:
    process.env
      .CLOUDINARY_API_SECRET || "",

  smtp_host:
    process.env.SMTP_HOST || "",

  smtp_port:
    process.env.SMTP_PORT || "465",

  smtp_user:
    process.env.SMTP_USER || "",

  smtp_pass:
    process.env.SMTP_PASS || "",

  email_from:
    process.env.EMAIL_FROM || "",

  contact_receiver_email:
    process.env.CONTACT_RECEIVER_EMAIL ||
    "",
};

export { env };