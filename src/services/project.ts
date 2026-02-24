import { projectScheme } from "@/lib/schemes/projectScheme"
import supabase from "@/lib/supabase/client"

const ProjectService = {
    getProject: async () => {
        const { data, error } = await supabase.from('project').select('*')
        if (error) throw error
        return data

    },
    updateProject: async (id: string, data: projectScheme) => {
        const { error } = await supabase.from('project').update(data).eq('id', id)
        if (error) throw error
    },
    addProject: async (data: projectScheme) => {
        const { error } = await supabase.from('project').insert(data)
        if (error) throw error
    },
    deleteProject: async (id: string) => {
        const { error } = await supabase.from('project').delete().eq('id', id)
        if (error) throw error
    }
}

export default ProjectService