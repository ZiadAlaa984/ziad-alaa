import { CertificateScheme } from "@/lib/schemes/certificateScheme"
import supabase from "@/lib/supabase/client"

const certificateService = {
    getcertificate: async () => {
        const { data, error } = await supabase.from('certificate').select('*')
        if (error) throw error
        return data

    },
    updatecertificate: async (id: string, data: CertificateScheme) => {
        const { error } = await supabase.from('certificate').update(data).eq('id', id)
        if (error) throw error
    },
    addcertificate: async (data: CertificateScheme) => {
        const { error } = await supabase.from('certificate').insert(data)
        if (error) throw error
    },
    deletecertificate: async (id: string) => {
        const { error } = await supabase.from('certificate').delete().eq('id', id)
        if (error) throw error
    }
}

export default certificateService