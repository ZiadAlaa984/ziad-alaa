import ProfileService from "@/services/profile"
import supabase from "../supabase/client"

export async function getPortfolioData() {

    const profile = await ProfileService.getProfile()

    return {
        ...profile,
    }
}

export interface resumeType {
    name: string;
    avatarUrl: string;
    summary: string;
    description: string;
}
