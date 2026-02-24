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
function FormExperience({ work }: { work?: WorkType }) {

    const { addWorkMutation, addWorkPending, updateWorkMutation, updateWorkPending } = useWork()

    const form = useForm<WorkScheme>({
        resolver: zodResolver(workSchema),
        defaultValues: {
            href: work?.href || "",
            location: work?.location || "",
            title: work?.title || "",
            logoUrl: work?.logoUrl || null,
            dateRange: work?.dateRange || "",
            description: work?.description || "",
            company: work?.company || "",
            employmentType: work?.employmentType || "full-time",
        },
    })

    const onSubmit = async (data: WorkScheme) => {
        if (data?.logoUrl instanceof File) {
            if (work?.logoUrl) {
                await deleteImage(work.logoUrl)
            }
            const uploadImg = await uploadImage(data.logoUrl)
            data.logoUrl = uploadImg
        }
        if (work?.id) {
            await updateWorkMutation({ id: work.id, data })
        } else {
            await addWorkMutation(data)
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
                                name="company"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Acme Inc." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Employment type */}
                            <FormField
                                control={form.control}
                                name="employmentType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Employment Type</FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select employment type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Type</SelectLabel>
                                                        <SelectItem value="full-time">
                                                            Full-time
                                                        </SelectItem>
                                                        <SelectItem value="part-time">
                                                            Part-time
                                                        </SelectItem>
                                                        <SelectItem value="internship">
                                                            Internship
                                                        </SelectItem>
                                                        <SelectItem value="volunteer">
                                                            Volunteer
                                                        </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
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
                                            <Input placeholder="Software Engineer" {...field} />
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


                            {/* Location */}
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location</FormLabel>
                                        <FormControl>
                                            <Input placeholder="New York, NY" {...field} />
                                        </FormControl>
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
                                        <FormLabel>Company URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://acme.com" {...field} />
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
                                            <Textarea rows={3} placeholder="What did you work on?" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <CardFooter className="px-0">
                                <Button
                                    type="submit"
                                    disabled={form.formState.isSubmitting || addWorkPending || updateWorkPending}
                                >
                                    {addWorkPending || updateWorkPending ? "Saving..." : "Save Changes"}
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

export default FormExperience