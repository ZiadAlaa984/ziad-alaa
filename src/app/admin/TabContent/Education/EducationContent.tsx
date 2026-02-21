"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DialogShared } from "@/shared/DialogShared";
import useEducation from "@/hooks/useEducation";
import TableEducation from "./TableEducation";
import FormEducation from "./FormExperience";

function EducationContent() {
    const { education } = useEducation();

    return (
        <Card className="border shadow mt-4">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Education</CardTitle>
                <DialogShared title="Add Education" description="Add new education" FormContent={<FormEducation />}>
                    <Button>
                        Add Education
                    </Button>
                </DialogShared>

            </CardHeader>
            <CardContent>
                <TableEducation education={education} />
            </CardContent>
        </Card >
    )
}

export default EducationContent
