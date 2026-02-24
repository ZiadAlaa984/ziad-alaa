"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DialogShared } from "@/shared/DialogShared";
import useCertificates from "@/hooks/useCertificates";
import TableCertificates from "./TableCertificates";
import FormCertificate from "./FormCertificate";

function CertificatesContent() {
    const { certificates } = useCertificates();

    return (
        <Card className="border shadow mt-4">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Certificates</CardTitle>
                <DialogShared title="Add Certificate" description="Add new Certificate" FormContent={<FormCertificate />}>
                    <Button>
                        Add Certificate
                    </Button>
                </DialogShared>

            </CardHeader>
            <CardContent>
                <TableCertificates certificates={certificates} />
            </CardContent>
        </Card >
    )
}

export default CertificatesContent
