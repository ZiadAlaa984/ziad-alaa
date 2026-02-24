"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DialogShared } from "@/shared/DialogShared";
import useProjects from "@/hooks/useProjects";
import TableProjects from "./TableProjects";
import FormProject from "./FormProject";

function ProjectsContent() {
    const { projects } = useProjects();

    return (
        <Card className="border shadow mt-4">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Projects</CardTitle>
                <DialogShared title="Add Project" description="Add new project" FormContent={<FormProject />}>
                    <Button>
                        Add Project
                    </Button>
                </DialogShared>

            </CardHeader>
            <CardContent>
                <TableProjects projects={projects} />
            </CardContent>
        </Card >
    )
}

export default ProjectsContent
