import { z } from "zod";

export const certificateScheme = z.object({
    title: z
        .string()
        .min(2, { message: "Project title must be at least 2 characters" })
        .max(100, { message: "Project title must be less than 100 characters" }),

    image: z
        .any()
        .optional()
        .refine(
            (file) => {
                if (!file) return true;
                if (typeof file === "string") return true;
                return file.size <= 1024 * 1024;
            },
            { message: "File size must be less than 1MB" }
        )
        .nullable()
        .optional(),

    description: z
        .string()
        .min(10, { message: "Description must be at least 10 characters" }),

    technologies: z
        .array(z.string())
        .min(1, { message: "Add at least one technology" }),
    dateRange: z
        .string()
        .min(2, { message: "Date range is required" }),


});

export type CertificateScheme = z.infer<typeof certificateScheme>;

export type certificateType = {
    id: string;
    title: string;
    dateRange: string;
    image: string | null;
    description: string;
    technologies: string[];
};
