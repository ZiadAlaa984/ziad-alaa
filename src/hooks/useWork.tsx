import { useAuth } from '@/context/useAuth'
import { toast } from 'sonner'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import WorkService from '@/services/work';
import { WorkScheme } from '@/lib/schemes/workScheme';

function useWork() {

    const { session } = useAuth();
    const queryClient = useQueryClient()

    const { data: work, isLoading, error } = useQuery({
        queryKey: ['work'],
        queryFn: () => WorkService.getWork(),
        enabled: !!session,
    })
    // update work
    const { mutateAsync: updateWorkMutation, isPending: updateWorkPending } = useMutation({
        mutationFn: ({ id, data }: { id: string; data: WorkScheme }) =>
            WorkService.updateWork(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["work"] });
            toast.success('Work updated successfully');
        },
        onError: (error) => {
            toast.error((error as Error).message);
        }
    })
    // delete work

    const { mutateAsync: deleteWorkMutation, isPending: deleteWorkPending } = useMutation({
        mutationFn: (id: string) =>
            WorkService.deleteWork(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["work"] });
            toast.success('Work deleted successfully');
        },
        onError: (error) => {
            toast.error((error as Error).message);
        }
    })
    // add work

    const { mutateAsync: addWorkMutation, isPending: addWorkPending } = useMutation({
        mutationFn: (data: WorkScheme) =>
            WorkService.addWork(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["work"] });
            toast.success('Work added successfully');
        },
        onError: (error) => {
            toast.error((error as Error).message);
        }
    })

    return {
        updateWorkMutation,
        updateWorkPending,
        deleteWorkMutation,
        deleteWorkPending,
        addWorkMutation,
        addWorkPending,
        work,
        isLoading,
        error

    }
}

export default useWork