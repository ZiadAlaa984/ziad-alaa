import { useAuth } from '@/context/useAuth'
import { toast } from 'sonner'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CertificateScheme } from '@/lib/schemes/certificateScheme';
import certificateService from '@/services/certificate';

function useCertificates() {

    const { session } = useAuth();
    const queryClient = useQueryClient()

    const { data: certificates, isLoading, error } = useQuery({
        queryKey: ['certificates'],
        queryFn: () => certificateService.getcertificate(),
        enabled: !!session,
    })
    // update certificate
    const { mutateAsync: updateCertificateMutation, isPending: updateCertificatePending } = useMutation({
        mutationFn: ({ id, data }: { id: string; data: CertificateScheme }) =>
            certificateService.updatecertificate(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["certificates"] });
            toast.success('Certificate updated successfully');
        },
        onError: (error) => {
            toast.error((error as Error).message);
        }
    })
    // delete project

    const { mutateAsync: deleteCertificateMutation, isPending: deleteCertificatePending } = useMutation({
        mutationFn: (id: string) =>
            certificateService.deletecertificate(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["certificates"] });
            toast.success('Certificate deleted successfully');
        },
        onError: (error) => {
            toast.error((error as Error).message);
        }
    })
    // add projects

    const { mutateAsync: addCertificateMutation, isPending: addCertificatePending } = useMutation({
        mutationFn: (data: CertificateScheme) =>
            certificateService.addcertificate(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["certificates"] });
            toast.success('Certificate added successfully');
        },
        onError: (error) => {
            toast.error((error as Error).message);
        }
    })

    return {
        updateCertificateMutation,
        updateCertificatePending,
        deleteCertificateMutation,
        deleteCertificatePending,
        addCertificateMutation,
        addCertificatePending,
        certificates,
        isLoading,
        error

    }
}

export default useCertificates