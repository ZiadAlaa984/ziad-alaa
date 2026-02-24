import { useAuth } from '@/context/useAuth'
import { toast } from 'sonner'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { projectScheme } from '@/lib/schemes/projectScheme';
import ProjectService from '@/services/project';

function useProjects() {

    const { session } = useAuth();
    const queryClient = useQueryClient()

    const { data: projects, isLoading, error } = useQuery({
        queryKey: ['projects'],
        queryFn: () => ProjectService.getProject(),
        enabled: !!session,
    })
    // update project
    const { mutateAsync: updateProjectsMutation, isPending: updateProjectsPending } = useMutation({
        mutationFn: ({ id, data }: { id: string; data: projectScheme }) =>
            ProjectService.updateProject(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            toast.success('Project updated successfully');
        },
        onError: (error) => {
            toast.error((error as Error).message);
        }
    })
    // delete project

    const { mutateAsync: deleteProjectsMutation, isPending: deleteProjectsPending } = useMutation({
        mutationFn: (id: string) =>
            ProjectService.deleteProject(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            toast.success('Project deleted successfully');
        },
        onError: (error) => {
            toast.error((error as Error).message);
        }
    })
    // add projects

    const { mutateAsync: addProjectsMutation, isPending: addProjectsPending } = useMutation({
        mutationFn: (data: projectScheme) =>
            ProjectService.addProject(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            toast.success('Project added successfully');
        },
        onError: (error) => {
            toast.error((error as Error).message);
        }
    })

    return {
        updateProjectsMutation,
        updateProjectsPending,
        deleteProjectsMutation,
        deleteProjectsPending,
        addProjectsMutation,
        addProjectsPending,
        projects,
        isLoading,
        error

    }
}

export default useProjects