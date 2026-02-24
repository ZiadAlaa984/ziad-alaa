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
import { profileScheme, ProfileScheme } from "@/lib/schemes/profileScheme"
import { useEffect } from "react"
import useProfile from "@/hooks/useProfile"
import { uploadImage, deleteImage } from "@/lib/image/imageUpload"
import ImageUpload from "../../../../shared/ImageUpload"
import Request from "@/shared/Request"


function ProfileContent() {
    const { profile, isLoading, updateProfileMutation, isPending } = useProfile()

    const form = useForm<ProfileScheme>({
        resolver: zodResolver(profileScheme),
        defaultValues: {
            name: "",
            description: "",
            summary: "",
            avatarUrl: null,
        },
    })

    useEffect(() => {
        if (profile) {
            form.reset({
                name: profile.name ?? "",
                description: profile.description ?? "",
                summary: profile.summary ?? "",
                avatarUrl: profile.avatarUrl ?? null,
            })
        }
    }, [profile, form])

    const onSubmit = async (data: ProfileScheme) => {
        if (!profile?.id) return
        if (data?.avatarUrl instanceof File) {
            if (profile.avatarUrl) {
                await deleteImage(profile.avatarUrl)
            }
            const uploadImg = await uploadImage(data.avatarUrl)
            data.avatarUrl = uploadImg
        }
        await updateProfileMutation({ id: profile.id, data })
    }

    return (
        <Request
            loading={isLoading}
            length={profile ? 1 : 0}
            emptyText="No profile found"
            btn="Create Profile"
        >
            <Card className="border shadow mt-4">
                <CardContent className="p-3">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col gap-4"
                        >
                            <FormField
                                control={form.control}
                                name="avatarUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Profile Picture</FormLabel>
                                        <ImageUpload
                                            value={field.value}
                                            onChange={field.onChange}
                                            size={128}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea rows={3} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="summary"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Summary</FormLabel>
                                        <FormControl>
                                            <Textarea rows={5} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <CardFooter className="px-0">
                                <Button
                                    type="submit"
                                    disabled={form.formState.isSubmitting || isPending}
                                >
                                    {isPending ? "Saving..." : "Save Changes"}
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </Request>
    )
}

export default ProfileContent
