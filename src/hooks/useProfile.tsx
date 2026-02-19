import { useAuth } from '@/context/useAuth'
import { toast } from 'sonner'
import { ProfileScheme } from '@/lib/schemes/profileScheme'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ProfileService from '@/services/profile';

function useProfile() {

    const { session } = useAuth();
    const queryClient = useQueryClient()

    const { data: profile, isLoading, error } = useQuery({
        queryKey: ['profile'],
        queryFn: () => ProfileService.getProfile(),
        enabled: !!session,
    })
    const { mutateAsync: updateProfileMutation, isPending } = useMutation({
        mutationFn: ({ id, data }: { id: string; data: ProfileScheme }) =>
            ProfileService.updateProfile(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
            toast.success('Profile updated successfully');
        },
        onError: (error) => {
            toast.error((error as Error).message);
        }
    })


    return {
        updateProfileMutation,
        isPending,
        profile,
        isLoading,
        error

    }
}

export default useProfile