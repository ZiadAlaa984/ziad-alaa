import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
export function DialogShared({ children, title, description, FormContent }: { children: React.ReactNode, title: string, description: string, FormContent: React.ReactNode }) {
    return (
        <Dialog >
            <form>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent >
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    </DialogHeader>

                    {FormContent}
                </DialogContent>
            </form>
        </Dialog>
    )
}
