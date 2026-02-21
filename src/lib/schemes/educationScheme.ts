import { z } from "zod";

export const educationSchema = z.object({
    school: z
        .string()
        .min(2, { message: "School name must be at least 2 characters" })
        .max(100, { message: "School name must be less than 100 characters" }),

    href: z
        .string()
        .url({ message: "Must be a valid URL" })
        .optional()
        .or(z.literal("")),

    degree: z
        .string()
        .min(2, { message: "Job title must be at least 2 characters" })
        .max(100, { message: "Job title must be less than 100 characters" }),

    logoUrl: z
        .any()
        .optional()
        .refine(
            (file) => {
                if (!file) return true;
                if (typeof file === "string") return true;
                return file.size <= 1024 * 1024;
            },
            { message: "File size must be less than 1MB" }
        ),

    dateRange: z
        .string()
        .min(2, { message: "Date range is required" }),

});

export type EducationScheme = z.infer<typeof educationSchema>;

export type EducationType = {
    id: string;
    href: string | null;
    school: string;
    degree: string;
    logoUrl: string | null;
    dateRange: string;
};