import ProfileService from "@/services/profile"
import WorkService from "@/services/work"
import { WorkType } from "../schemes/workScheme"

export async function getPortfolioData() {

    const profile = await ProfileService.getProfile()
    const work = await WorkService.getWork()

    return {
        ...profile,
        work,
    }
}

export interface resumeType {
    name: string;
    avatarUrl: string;
    summary: string;
    description: string;
    work: WorkType[];
}
