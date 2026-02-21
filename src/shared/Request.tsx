import React from 'react'
import { TableCell, TableRow } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { PackageOpen } from 'lucide-react'

function Request({
    loading,
    emptyText,
    btn,
    children,
    length,
    rawSpan,
}: {
    loading: boolean
    emptyText: string
    btn: React.ReactNode
    children: React.ReactNode
    length: number
    rawSpan?: number
}) {
    // ── LOADING ──────────────────────────────────────────────
    if (loading) {
        if (rawSpan !== undefined) {
            // Table skeleton rows
            return (
                <>
                    {Array.from({ length: 3 }).map((_, i) => (
                        <TableRow key={i}>
                            <TableCell colSpan={rawSpan}>
                                <Skeleton className="h-6 w-full rounded-md" />
                            </TableCell>
                        </TableRow>
                    ))}
                </>
            )
        }

        // Generic skeleton list
        return (
            <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full rounded-md" />
                ))}
            </div>
        )
    }

    // ── EMPTY ─────────────────────────────────────────────────
    if (length === 0) {
        const emptyContent = (
            <div className="flex flex-col items-center justify-center gap-3 py-10 text-muted-foreground">
                <PackageOpen className="h-10 w-10 opacity-40" />
                <p className="text-sm">{emptyText}</p>
                {btn && (
                    btn
                )}
            </div>
        )

        if (rawSpan !== undefined) {
            return (
                <TableRow>
                    <TableCell colSpan={rawSpan}>{emptyContent}</TableCell>
                </TableRow>
            )
        }

        return emptyContent
    }

    // ── DATA ──────────────────────────────────────────────────
    return <>{children}</>
}

export default Request