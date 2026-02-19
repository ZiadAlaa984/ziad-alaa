import { toast } from "sonner"
import supabase from "../supabase/client"

export const uploadImage = async (file: File): Promise<string> => {
    try {
        const fileExt = file.name.split('.').pop()
        const fileName = `${crypto.randomUUID()}.${fileExt}`
        const filePath = `avatars/${fileName}`

        const { error: uploadError } = await supabase.storage
            .from('portfolio')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false,
            })

        if (uploadError) throw uploadError

        const { data } = supabase.storage
            .from('portfolio')
            .getPublicUrl(filePath)

        return data.publicUrl
    } catch (error) {
        toast.error('Image upload failed:', { description: (error as Error).message })
        throw error
    }
}

export const deleteImage = async (fileUrl: string): Promise<void> => {
    try {
        // extract path after /portfolio/
        const path = fileUrl.split("/portfolio/")[1]

        if (!path) throw new Error("Invalid file path")

        const { error } = await supabase.storage
            .from("portfolio")
            .remove([path])

        if (error) throw error
    } catch (error) {
        toast.error("Image delete failed:", {
            description: (error as Error).message,
        })
        throw error
    }
}
