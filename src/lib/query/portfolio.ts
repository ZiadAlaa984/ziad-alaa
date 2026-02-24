import ProfileService from "@/services/profile"
import WorkService from "@/services/work"
import { WorkType } from "../schemes/workScheme"
import EducationService from "@/services/education"
import ContactService from "@/services/contact"
import { EducationType } from "../schemes/educationScheme"
import { ContactType } from "../schemes/contactScheme"
import ProjectService from "@/services/project"
import { projectType } from "../schemes/projectScheme"
import certificateService from "@/services/certificate"
import { certificateType } from "../schemes/certificateScheme"

export async function getPortfolioData() {

    const profile = await ProfileService.getProfile()
    const work = await WorkService.getWork()
    const education = await EducationService.getEducation()
    const contact = await ContactService.getContact()
    const projects = await ProjectService.getProject()
    const certificates = await certificateService.getcertificate()

    return {
        ...profile,
        work,
        education,
        contact,
        projects,
        certificates,
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
    projects: projectType[];
    certificates: certificateType[];
}
