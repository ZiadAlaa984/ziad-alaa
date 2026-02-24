import { z } from "zod";

export const workSchema = z.object({
    company: z
        .string()
        .min(2, { message: "Company name must be at least 2 characters" })
        .max(100, { message: "Company name must be less than 100 characters" }),

    href: z
        .string()
        .url({ message: "Must be a valid URL" })
        .optional()
        .or(z.literal("")),

    location: z
        .string()
        .min(2, { message: "Location must be at least 2 characters" })
        .max(100, { message: "Location must be less than 100 characters" }),

    title: z
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

    description: z
        .string()
        .min(10, { message: "Description must be at least 10 characters" })
        .max(2000, { message: "Description must be less than 2000 characters" }),

    employmentType: z.enum(["full-time", "part-time", "internship", "volunteer"]),
});

export type WorkScheme = z.infer<typeof workSchema>;

export type WorkType = {
    id: string;
    company: string;
    href: string | null;
    location: string;
    title: string;
    logoUrl: string | null;
    dateRange: string;
    description: string;
    employmentType: "full-time" | "part-time" | "internship" | "volunteer";
};