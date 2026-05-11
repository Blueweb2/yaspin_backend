import bcrypt from "bcryptjs";
import mongoose, { Schema, model } from "mongoose";

import { IUser } from "./user.interface";

const socialLinksSchema = new Schema(
  {
    github: String,
    linkedin: String,
    twitter: String,
    website: String,
  },
  {
    _id: false,
  }
);

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    avatar: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "admin",
    },

    socialLinks: {
      type: socialLinksSchema,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  const user = this;

  if (!user.isModified("password")) {
    return;
  }

  user.password = await bcrypt.hash(
    user.password,
    10
  );
});

export const User = model<IUser>("User", userSchema);