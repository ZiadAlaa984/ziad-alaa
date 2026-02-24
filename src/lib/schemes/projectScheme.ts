import { z } from "zod";

export const projectSchema = z.object({
    title: z
        .string()
        .min(2, { message: "Project title must be at least 2 characters" })
        .max(100, { message: "Project title must be less than 100 characters" }),

    href: z
        .string()
        .url({ message: "Must be a valid URL" })
        .nullable()
        .optional(),

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


    github: z.string().url({ message: "Must be a valid URL" }),
});

export type projectScheme = z.infer<typeof projectSchema>;

export type projectType = {
    id: string;
    title: string;
    href: string;
    image: string | null;
    description: string;
    technologies: string[];
    github: string;
};
