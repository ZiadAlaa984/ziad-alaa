import supabase from '@/lib/supabase/client';
import { toast } from 'sonner';

function useProjects() {
    const getProjects = async () => {
        try {
            const { data, error } = await supabase.from('projects').select('*');
            if (error) throw error
            return data
        } catch (error) {
            toast.error((error as Error).message)
        }
    }

    return {
        getProjects,
    }
}

export default useProjects
