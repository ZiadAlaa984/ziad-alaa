import { WorkScheme } from "@/lib/schemes/workScheme"
import supabase from "@/lib/supabase/client"

const WorkService = {
    getWork: async () => {
        const { data, error } = await supabase.from('work').select('*')
        if (error) throw error
        return data

    },
    updateWork: async (id: string, data: WorkScheme) => {
        const { error } = await supabase.from('work').update(data).eq('id', id)
        if (error) throw error
    },
    addWork: async (data: WorkScheme) => {
        const { error } = await supabase.from('work').insert(data)
        if (error) throw error
    },
    deleteWork: async (id: string) => {
        const { error } = await supabase.from('work').delete().eq('id', id)
        if (error) throw error
    }
}

export default WorkService