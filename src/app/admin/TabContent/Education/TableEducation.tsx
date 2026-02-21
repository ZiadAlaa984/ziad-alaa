
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
import { EducationType } from '@/lib/schemes/educationScheme'
import useEducation from '@/hooks/useEducation'
import FormEducation from './FormExperience'

function TableEducation({ education }: { education: EducationType[] | undefined }) {
    const { deleteEducationPending, deleteEducationMutation, isLoading } = useEducation();
    return (
        <div className='w-full'>
            <div className='[&>div]:rounded-sm [&>div]:border'>
                <Table>
                    <TableHeader>
                        <TableRow className='hover:bg-transparent'>
                            <TableHead>School</TableHead>
                            <TableHead>Date Range</TableHead>
                            <TableHead className='w-0'>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <Request loading={isLoading} length={education?.length ?? 0} emptyText="No education added yet" btn={<DialogShared title="Add Education" description="Add new education" FormContent={<FormEducation />}>
                            <Button>
                                Add Education
                            </Button>
                        </DialogShared>} rawSpan={4}>
                            {education?.map(education => (
                                <TableRow key={education.id} className='has-data-[state=checked]:bg-muted/50'>
                                    <TableCell>
                                        <div className='flex items-center gap-3'>
                                            <Avatar className='rounded-sm'>
                                                <AvatarImage src={education.logoUrl ?? ""} alt={education.school} />
                                                <AvatarFallback className='text-xs'>{education.school.slice(0, 2)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className='font-medium'>{education.school}</div>
                                                <span className='text-muted-foreground mt-0.5 text-xs'>{education.degree}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{education.dateRange}</TableCell>
                                    <TableCell className='flex items-center gap-1'>
                                        <DialogShared title="Edit Education" description="Edit education" FormContent={<FormEducation education={education} />}>
                                            <Button variant='ghost' size='icon' className='rounded-full' aria-label={`product-${education.id}-edit`}>
                                                <PencilIcon />
                                            </Button>
                                        </DialogShared>
                                        <AlertDialogDestructive onConfirm={() => deleteEducationMutation(education.id)} title='delete this Education' pending={deleteEducationPending}>
                                            <Button variant='ghost' size='icon' className='rounded-full' aria-label={`product-${education.id}-remove`}>
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

export default TableEducation