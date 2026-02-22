import ProfileService from "@/services/profile"
import WorkService from "@/services/work"
import { WorkType } from "../schemes/workScheme"
import EducationService from "@/services/education"
import ContactService from "@/services/contact"
import { EducationType } from "../schemes/educationScheme"
import { ContactType } from "../schemes/contactScheme"

export async function getPortfolioData() {

    const profile = await ProfileService.getProfile()
    const work = await WorkService.getWork()
    const education = await EducationService.getEducation()
    const contact = await ContactService.getContact()

    return {
        ...profile,
        work,
        education,
        contact,
    }
}

export interface resumeType {
    name: string;
    avatarUrl: string;
    summary: string;
    description: string;
    work: WorkType[];
    education: EducationType[];
    contact: ContactType;
}
