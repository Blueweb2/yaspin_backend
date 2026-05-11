import { Schema, model } from "mongoose";

import { IProject } from "./project.interface";

import {
    PROJECT_STATUS,
    PROJECT_CATEGORIES,
} from "./project.constant";

const featureSchema = new Schema(
    {
        label: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        _id: false,
    }
);

const projectSchema = new Schema<IProject>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
            trim: true,
        },

        thumbnail: {
            type: String,
            required: true,
        },

        gallery: {
            type: [String],
            default: [],
        },

        category: {
            type: String,
            enum: PROJECT_CATEGORIES,
            required: true,
        },

        technologies: {
            type: [String],
            default: [],
        },

        features: {
            type: [featureSchema],
            default: [],
        },

        location: {
            type: String,
            default: "",
            trim: true,
        },

        client: {
            type: String,
            default: "",
            trim: true,
        },

        completionYear: {
            type: Number,
        },

        featured: {
            type: Boolean,
            default: false,
        },

        order: {
            type: Number,
            default: 0,
        },

        status: {
            type: String,
            enum: PROJECT_STATUS,
            default: "completed",
        },

        projectUrl: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

export const Project = model<IProject>(
    "Project",
    projectSchema
);