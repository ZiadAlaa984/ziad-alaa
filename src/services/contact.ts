import { ContactScheme } from "@/lib/schemes/contactScheme"
import supabase from "@/lib/supabase/client"

const ContactService = {
    getContact: async () => {
        const { data, error } = await supabase.from('contact').select('*')
        if (error) throw error
        return data[0]

    },
    updateContact: async (id: string, data: ContactScheme) => {
        const { error } = await supabase.from('contact').update(data).eq('id', id)
        if (error) throw error
    },
    addContact: async (data: ContactScheme) => {
        const { error } = await supabase.from('contact').insert(data)
        if (error) throw error
    },
    deleteContact: async (id: string) => {
        const { error } = await supabase.from('contact').delete().eq('id', id)
        if (error) throw error
    }
}

export default ContactService