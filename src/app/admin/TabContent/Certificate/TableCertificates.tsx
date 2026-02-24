
import { PencilIcon, Trash2Icon } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { AlertDialogDestructive } from '@/shared/alertDialogShared'
import Request from '@/shared/Request'
import { DialogShared } from '@/shared/DialogShared'
import useCertificates from '@/hooks/useCertificates'
import { certificateType } from '@/lib/schemes/certificateScheme'
import FormCertificate from './FormCertificate'

function TableCertificates({ certificates }: { certificates: certificateType[] | undefined }) {
    const { deleteCertificateMutation, deleteCertificatePending, isLoading } = useCertificates();
    return (
        <div className='w-full'>
            <div className='[&>div]:rounded-sm [&>div]:border'>
                <Table>
                    <TableHeader>
                        <TableRow className='hover:bg-transparent'>
                            <TableHead>Title</TableHead>
                            <TableHead className='w-0'>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <Request loading={isLoading} length={certificates?.length ?? 0} emptyText="No Certificate added yet" btn={<DialogShared title="Add Certificate" description="Add new Certificate" FormContent={<FormCertificate />}>
                            <Button>
                                Add Certificate
                            </Button>
                        </DialogShared>} rawSpan={4}>
                            {certificates?.map(certificate => (
                                <TableRow key={certificate.id} className='has-data-[state=checked]:bg-muted/50'>
                                    <TableCell>
                                        <div className='flex items-center gap-3'>
                                            <Avatar className='rounded-sm'>
                                                <AvatarImage src={certificate.image ?? ""} alt={certificate.title} />
                                                <AvatarFallback className='text-xs'>{certificate.title.slice(0, 2)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className='font-medium'>{certificate.title}</div>
                                                <span className='text-muted-foreground mt-0.5 text-xs'>{certificate.description}</span>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell className='flex items-center gap-1'>
                                        <DialogShared title="Edit Experience" description="Edit experience" FormContent={<FormCertificate certificate={certificate} />}>
                                            <Button variant='ghost' size='icon' className='rounded-full' aria-label={`product-${certificate.id}-edit`}>
                                                <PencilIcon />
                                            </Button>
                                        </DialogShared>
                                        <AlertDialogDestructive onConfirm={() => deleteCertificateMutation(certificate.id)} title='delete this Experience' pending={deleteCertificatePending}>
                                            <Button variant='ghost' size='icon' className='rounded-full' aria-label={`product-${certificate.id}-remove`}>
                                                <Trash2Icon />
                                            </Button>
                                        </AlertDialogDestructive>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </Request>
                    </TableBody>
                </Table>
            </div>
        </div>)
}

export default TableCertificates