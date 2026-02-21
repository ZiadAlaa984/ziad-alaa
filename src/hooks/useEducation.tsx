import { useAuth } from '@/context/useAuth'
import { toast } from 'sonner'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import EducationService from '@/services/education';
import { EducationScheme } from '@/lib/schemes/educationScheme';

function useEducation() {

    const { session } = useAuth();
    const queryClient = useQueryClient()

    const { data: education, isLoading, error } = useQuery({
        queryKey: ['education'],
        queryFn: () => EducationService.getEducation(),
        enabled: !!session,
    })
    // update education
    const { mutateAsync: updateEducationMutation, isPending: updateEducationPending } = useMutation({
        mutationFn: ({ id, data }: { id: string; data: EducationScheme }) =>
            EducationService.updateEducation(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["education"] });
            toast.success('Education updated successfully');
        },
        onError: (error) => {
            toast.error((error as Error).message);
        }
    })
    // delete education

    const { mutateAsync: deleteEducationMutation, isPending: deleteEducationPending } = useMutation({
        mutationFn: (id: string) =>
            EducationService.deleteEducation(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["education"] });
            toast.success('Education deleted successfully');
        },
        onError: (error) => {
            toast.error((error as Error).message);
        }
    })
    // add education

    const { mutateAsync: addEducationMutation, isPending: addEducationPending } = useMutation({
        mutationFn: (data: EducationScheme) =>
            EducationService.addEducation(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["education"] });
            toast.success('Education added successfully');
        },
        onError: (error) => {
            toast.error((error as Error).message);
        }
    })

    return {
        updateEducationMutation,
        updateEducationPending,
        deleteEducationMutation,
        deleteEducationPending,
        addEducationMutation,
        addEducationPending,
        education,
        isLoading,
        error

    }
}

export default useEducation