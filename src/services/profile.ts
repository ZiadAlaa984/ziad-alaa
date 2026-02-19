import { ProfileScheme } from "@/lib/schemes/profileScheme"
import supabase from "@/lib/supabase/client"

const ProfileService = {
    getProfile: async () => {
        const { data, error } = await supabase.from('profile').select('*')
        if (error) throw error
        return data[0]

    },
    updateProfile: async (id: string, data: ProfileScheme) => {
        const { error } = await supabase.from('profile').update(data).eq('id', id)
        if (error) throw error
    }
}

export default ProfileService