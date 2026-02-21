import ProfileService from "@/services/profile"
import WorkService from "@/services/work"
import { WorkType } from "../schemes/workScheme"
import { EducationType } from "../schemes/educationScheme"
import EducationService from "@/services/education"

export async function getPortfolioData() {

    const profile = await ProfileService.getProfile()
    const work = await WorkService.getWork()
    const education = await EducationService.getEducation()

    return {
        ...profile,
        work,
        education,
    }
}

export interface resumeType {
    name: string;
    avatarUrl: string;
    summary: string;
    description: string;
    work: WorkType[];
    education: EducationType[];
}
