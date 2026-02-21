import { EducationScheme } from "@/lib/schemes/educationScheme"
import supabase from "@/lib/supabase/client"

const EducationService = {
    getEducation: async () => {
        const { data, error } = await supabase.from('education').select('*')
        if (error) throw error
        return data

    },
    updateEducation: async (id: string, data: EducationScheme) => {
        const { error } = await supabase.from('education').update(data).eq('id', id)
        if (error) throw error
    },
    addEducation: async (data: EducationScheme) => {
        const { error } = await supabase.from('education').insert(data)
        if (error) throw error
    },
    deleteEducation: async (id: string) => {
        const { error } = await supabase.from('education').delete().eq('id', id)
        if (error) throw error
    }
}

export default EducationService