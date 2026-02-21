"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"
import { Trash2Icon } from "lucide-react"
import { useEffect, useState } from "react"

interface AlertDialogDestructiveProps {
    children: React.ReactNode
    title?: string
    description?: string
    onConfirm?: () => void
    pending?: boolean
}

export function AlertDialogDestructive({
    children,
    title = "Are you absolutely sure?",
    description = "This action cannot be undone. This will permanently delete this item.",
    onConfirm,
    pending = false,
}: AlertDialogDestructiveProps) {

    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (!pending) {
            setOpen(false)
        }
    }, [pending])

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>

            <AlertDialogContent className="sm:max-w-md rounded-2xl">
                <AlertDialogHeader className="gap-4">

                    {/* Icon + Title */}
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                            <Trash2Icon className="h-5 w-5 text-destructive" />
                        </div>

                        <AlertDialogTitle className="text-lg font-semibold">
                            {title}
                        </AlertDialogTitle>
                    </div>

                    <AlertDialogDescription className="text-sm text-muted-foreground">
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="gap-2 sm:justify-end">
                    <AlertDialogCancel asChild>
                        <Button variant="outline">
                            Cancel
                        </Button>
                    </AlertDialogCancel>

                    <AlertDialogAction asChild>
                        <Button
                            onClick={onConfirm}
                            variant="destructive"
                            disabled={pending}
                        >
                            {pending ? "Deleting..." : "Delete"}
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}