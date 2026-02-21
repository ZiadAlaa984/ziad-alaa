"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import useWork from "@/hooks/useWork"
import TableExperience from "./TableExperience";
import { DialogShared } from "@/shared/DialogShared";
import FormExperience from "./FormExperience";

function ExperienceContent() {
    const { work } = useWork();

    // handle reqstatus
    // create model create work and handle update work


    return (
        <Card className="border shadow mt-4">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Work Experience</CardTitle>
                <DialogShared title="Add Experience" description="Add new experience" FormContent={<FormExperience />}>
                    <Button>
                        Add Experience
                    </Button>
                </DialogShared>

            </CardHeader>
            <CardContent>
                <TableExperience works={work} />
            </CardContent>
        </Card >
    )
}

export default ExperienceContent
