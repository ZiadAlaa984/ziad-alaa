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
import { projectSchema, projectScheme, projectType } from "@/lib/schemes/projectScheme"
import useProjects from "@/hooks/useProjects"
import { deleteImage, uploadImage } from "@/lib/image/imageUpload"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import ImageUpload from "@/shared/ImageUpload"
import MultiSelect from "@/shared/MultiSelect"

function FormProject({ project }: { project?: projectType }) {

    const { addProjectsMutation, addProjectsPending, updateProjectsMutation, updateProjectsPending } = useProjects()

    const form = useForm<projectScheme>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            title: project?.title || "",
            href: project?.href || "",
            image: project?.image || null,
            description: project?.description || "",
            technologies: project?.technologies || [],
            github: project?.github || "",
        },
    })

    // For dynamic technologies array
    const { fields: techFields, append: appendTech, remove: removeTech } = useFieldArray({
        control: form.control,
        name: "technologies",
    })

    // For dynamic links array
    const { fields: linkFields, append: appendLink, remove: removeLink } = useFieldArray({
        control: form.control,
        name: "links",
    })

    const onSubmit = async (data: projectScheme) => {
        if (data?.image instanceof File) {
            if (project?.image) {
                await deleteImage(project.image)
            }
            const uploadImg = await uploadImage(data.image)
            data.image = uploadImg
        }
        if (project?.id) {
            await updateProjectsMutation({ id: project.id, data })
        } else {
            await addProjectsMutation(data)
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

                            {/* Href */}
                            <FormField
                                control={form.control}
                                name="href"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project URL</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="https://myproject.com"
                                                {...field}
                                                value={field.value ?? ""}
                                            />
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

                            {/* Github */}
                            <FormField
                                control={form.control}
                                name="github"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>GitHub URL</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="https://github.com/username/project"
                                                {...field}
                                                value={field.value ?? ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <CardFooter className="px-0">
                                <Button
                                    type="submit"
                                    disabled={form.formState.isSubmitting || addProjectsPending || updateProjectsPending}
                                >
                                    {addProjectsPending || updateProjectsPending ? "Saving..." : "Save Changes"}
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

export default FormProject