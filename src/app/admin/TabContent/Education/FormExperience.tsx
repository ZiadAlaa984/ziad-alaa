"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { workSchema, WorkScheme, WorkType } from "@/lib/schemes/workScheme"
import useWork from "@/hooks/useWork"
import { deleteImage, uploadImage } from "@/lib/image/imageUpload"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import ImageUpload from "@/shared/ImageUpload"
import { CalendarRange } from "@/shared/CalendarRange"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { educationSchema, EducationScheme, EducationType } from "@/lib/schemes/educationScheme"
import useEducation from "@/hooks/useEducation"
function FormEducation({ education }: { education?: EducationType }) {

    const { addEducationMutation, addEducationPending, updateEducationMutation, updateEducationPending } = useEducation()

    const form = useForm<EducationScheme>({
        resolver: zodResolver(educationSchema),
        defaultValues: {
            href: education?.href || "",
            degree: education?.degree || "",
            logoUrl: education?.logoUrl || null,
            dateRange: education?.dateRange || "",
            school: education?.school || "",
        },
    })
    const onSubmit = async (data: EducationScheme) => {
        if (data?.logoUrl instanceof File) {
            if (education?.logoUrl) {
                await deleteImage(education.logoUrl)
            }
            const uploadImg = await uploadImage(data.logoUrl)
            data.logoUrl = uploadImg
        }
        if (education?.id) {
            await updateEducationMutation({ id: education.id, data })
        } else {
            await addEducationMutation(data)
        }
    }

    return (
        <ScrollArea className="h-[500px]">
            <Card className="border shadow ">
                <CardContent className="p-3">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col gap-4"
                        >
                            {/* Logo */}
                            <FormField
                                control={form.control}
                                name="logoUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company Logo</FormLabel>
                                        <ImageUpload
                                            value={field.value}
                                            onChange={field.onChange}
                                            size={128}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Company */}
                            <FormField
                                control={form.control}
                                name="school"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>School</FormLabel>
                                        <FormControl>
                                            <Input placeholder="School name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Title */}
                            <FormField
                                control={form.control}
                                name="degree"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Degree</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Degree" {...field} />
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

                            {/* Href */}
                            <FormField
                                control={form.control}
                                name="href"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Education URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://acme.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <CardFooter className="px-0">
                                <Button
                                    type="submit"
                                    disabled={form.formState.isSubmitting || addEducationPending || updateEducationPending}
                                >
                                    {addEducationPending || updateEducationPending ? "Saving..." : "Save Changes"}
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

export default FormEducation