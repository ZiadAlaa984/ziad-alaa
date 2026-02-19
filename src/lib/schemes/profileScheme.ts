import { z } from "zod";

export const profileScheme = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(2).max(100),
    summary: z.string().min(2).max(1000),

    avatarUrl: z
        .any()
        .optional()
        .refine(
            (file) => {
                if (!file) return true
                if (typeof file === "string") return true
                return file.size <= 1024 * 1024
            },
            { message: "File size must be less than 1MB" }
        ),
})

export type ProfileScheme = z.infer<typeof profileScheme>


export type ProfileType = {
    id?: string;
    name: string;
    description: string;
    summary: string;
    avatarUrl: File | string | null;
}