
import { PencilIcon, Trash2Icon } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { WorkType } from '@/lib/schemes/workScheme'
import { AlertDialogDestructive } from '@/shared/alertDialogShared'
import useWork from '@/hooks/useWork'
import Request from '@/shared/Request'
import { DialogShared } from '@/shared/DialogShared'
import FormExperience from './FormExperience'

function TableExperience({ works }: { works: WorkType[] | undefined }) {
    const { deleteWorkPending, deleteWorkMutation, isLoading } = useWork();
    return (
        <div className='w-full'>
            <div className='[&>div]:rounded-sm [&>div]:border'>
                <Table>
                    <TableHeader>
                        <TableRow className='hover:bg-transparent'>
                            <TableHead>Company</TableHead>
                            <TableHead>Employment Type</TableHead>
                            <TableHead>Date Range</TableHead>
                            <TableHead className='w-0'>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <Request loading={isLoading} length={works?.length ?? 0} emptyText="No experience added yet" btn={<DialogShared title="Add Experience" description="Add new experience" FormContent={<FormExperience />}>
                            <Button>
                                Add Experience
                            </Button>
                        </DialogShared>} rawSpan={4}>
                            {works?.map(work => (
                                <TableRow key={work.id} className='has-data-[state=checked]:bg-muted/50'>
                                    <TableCell>
                                        <div className='flex items-center gap-3'>
                                            <Avatar className='rounded-sm'>
                                                <AvatarImage src={work.logoUrl ?? ""} alt={work.company} />
                                                <AvatarFallback className='text-xs'>{work.company.slice(0, 2)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className='font-medium'>{work.company}</div>
                                                <span className='text-muted-foreground mt-0.5 text-xs'>{work.title}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{work.employmentType}</TableCell>
                                    <TableCell>{work.dateRange}</TableCell>
                                    <TableCell className='flex items-center gap-1'>
                                        <DialogShared title="Edit Experience" description="Edit experience" FormContent={<FormExperience work={work} />}>
                                            <Button variant='ghost' size='icon' className='rounded-full' aria-label={`product-${work.id}-edit`}>
                                                <PencilIcon />
                                            </Button>
                                        </DialogShared>
                                        <AlertDialogDestructive onConfirm={() => deleteWorkMutation(work.id)} title='delete this Experience' pending={deleteWorkPending}>
                                            <Button variant='ghost' size='icon' className='rounded-full' aria-label={`product-${work.id}-remove`}>
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

export default TableExperience