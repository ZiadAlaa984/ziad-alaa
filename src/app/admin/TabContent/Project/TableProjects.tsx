
import { PencilIcon, Trash2Icon } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { AlertDialogDestructive } from '@/shared/alertDialogShared'
import Request from '@/shared/Request'
import { DialogShared } from '@/shared/DialogShared'
import { projectType } from '@/lib/schemes/projectScheme'
import useProjects from '@/hooks/useProjects'
import FormProject from './FormProject'

function TableProjects({ projects }: { projects: projectType[] | undefined }) {
    const { deleteProjectsPending, deleteProjectsMutation, isLoading } = useProjects();
    return (
        <div className='w-full'>
            <div className='[&>div]:rounded-sm [&>div]:border'>
                <Table>
                    <TableHeader>
                        <TableRow className='hover:bg-transparent'>
                            <TableHead>Title</TableHead>
                            <TableHead>Link</TableHead>
                            <TableHead className='w-0'>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <Request loading={isLoading} length={projects?.length ?? 0} emptyText="No experience added yet" btn={<DialogShared title="Add Experience" description="Add new experience" FormContent={<FormProject />}>
                            <Button>
                                Add Experience
                            </Button>
                        </DialogShared>} rawSpan={4}>
                            {projects?.map(project => (
                                <TableRow key={project.id} className='has-data-[state=checked]:bg-muted/50'>
                                    <TableCell>
                                        <div className='flex items-center gap-3'>
                                            <Avatar className='rounded-sm'>
                                                <AvatarImage src={project.image ?? ""} alt={project.title} />
                                                <AvatarFallback className='text-xs'>{project.title.slice(0, 2)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className='font-medium'>{project.title}</div>
                                                <span className='text-muted-foreground mt-0.5 text-xs'>{project.description}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{project.href}</TableCell>
                                    <TableCell className='flex items-center gap-1'>
                                        <DialogShared title="Edit Experience" description="Edit experience" FormContent={<FormProject project={project} />}>
                                            <Button variant='ghost' size='icon' className='rounded-full' aria-label={`product-${project.id}-edit`}>
                                                <PencilIcon />
                                            </Button>
                                        </DialogShared>
                                        <AlertDialogDestructive onConfirm={() => deleteProjectsMutation(project.id)} title='delete this Experience' pending={deleteProjectsPending}>
                                            <Button variant='ghost' size='icon' className='rounded-full' aria-label={`product-${project.id}-remove`}>
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

export default TableProjects