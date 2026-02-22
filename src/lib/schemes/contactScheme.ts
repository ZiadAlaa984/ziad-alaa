import { z } from "zod";

export const socialLinkSchema = z.object({
    id: z.string(),

    name: z
        .string()
        .min(2, { message: "Platform name must be at least 2 characters" })
        .max(50, { message: "Platform name must be less than 50 characters" }),

    url: z
        .string()
        .url({ message: "Must be a valid URL" }),

    icon: z
        .string()
        .min(2, { message: "Icon is required" }),

    navbar: z.boolean(),
});

export const contactSchema = z.object({
    email: z
        .string()
        .email({ message: "Must be a valid email address" }),

    tel: z
        .string()
        .min(6, { message: "Phone number is required" }),

    social: z
        .array(socialLinkSchema)
        .min(1, { message: "At least one social link is required" }),
});

export type ContactScheme = z.infer<typeof contactSchema>;

export type SocialLinkType = {
    id: string;
    name: string;
    url: string;
    icon: string;
    navbar: boolean;
};

export type ContactType = {
    email: string;
    tel: string;
    social: SocialLinkType[];
};