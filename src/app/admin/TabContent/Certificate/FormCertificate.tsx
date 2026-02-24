"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useForm, useFieldArray } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { deleteImage, uploadImage } from "@/lib/image/imageUpload"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import ImageUpload from "@/shared/ImageUpload"
import MultiSelect from "@/shared/MultiSelect"
import { certificateScheme, CertificateScheme, certificateType } from "@/lib/schemes/certificateScheme"
import useCertificates from "@/hooks/useCertificates"
import { CalendarRange } from "@/shared/CalendarRange"

function FormCertificate({ certificate }: { certificate?: certificateType }) {

    const { addCertificateMutation, addCertificatePending, updateCertificateMutation, updateCertificatePending } = useCertificates()

    const form = useForm<CertificateScheme>({
        resolver: zodResolver(certificateScheme),
        defaultValues: {
            title: certificate?.title || "",
            image: certificate?.image || null,
            description: certificate?.description || "",
            technologies: certificate?.technologies || [],
            dateRange: certificate?.dateRange || "",
        },
    })


    const onSubmit = async (data: CertificateScheme) => {
        if (data?.image instanceof File) {
            if (certificate?.image) {
                await deleteImage(certificate.image)
            }
            const uploadImg = await uploadImage(data.image)
            data.image = uploadImg
        }
        if (certificate?.id) {
            await updateCertificateMutation({ id: certificate.id, data })
        } else {
            await addCertificateMutation(data)
        }
    }

    return (
        <ScrollArea className="h-[500px]">
            <Card className="border shadow">
                <CardContent className="p-3">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col gap-4"
                        >
                            {/* Logo */}
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Preview Image</FormLabel>
                                        <ImageUpload
                                            value={field.value}
                                            onChange={field.onChange}
                                            size={128}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Title */}
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="My Awesome Project" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Description */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea rows={3} placeholder="What does this project do?" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Date Range */}
                            <FormField
                                control={form.control}
                                name="dateRange"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date Range</FormLabel>
                                        <CalendarRange

                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            {/* Technologies */}
                            <FormField
                                control={form.control}
                                name="technologies"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Technologies</FormLabel>
                                        <MultiSelect
                                            value={field.value}
                                            onChange={field.onChange}

                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />




                            <CardFooter className="px-0">
                                <Button
                                    type="submit"
                                    disabled={form.formState.isSubmitting || addCertificatePending || updateCertificatePending}
                                >
                                    {addCertificatePending || updateCertificatePending ? "Saving..." : "Save Changes"}
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <ScrollBar orientation="vertical" />
        </ScrollArea>
    )
}

export default FormCertificate