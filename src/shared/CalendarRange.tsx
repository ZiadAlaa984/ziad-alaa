"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { type DateRange } from "react-day-picker"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"

interface CalendarRangeProps {
    value?: string
    onChange?: (value: string) => void
}

const PRESENT_LABEL = "Present"

function parseValue(val?: string): { range: DateRange | undefined; presentEnabled: boolean } {
    if (!val) return { range: undefined, presentEnabled: false }
    const parts = val.split(" - ")
    if (parts.length !== 2) return { range: undefined, presentEnabled: false }
    const from = new Date(parts[0])
    if (isNaN(from.getTime())) return { range: undefined, presentEnabled: false }
    const presentEnabled = parts[1] === PRESENT_LABEL
    const to = presentEnabled ? undefined : new Date(parts[1])
    if (!presentEnabled && to && isNaN(to.getTime())) return { range: undefined, presentEnabled: false }
    return { range: { from, to }, presentEnabled }
}

export function CalendarRange({ value, onChange }: CalendarRangeProps) {
    const { range: parsedRange, presentEnabled: parsedPresent } = parseValue(value)

    const [dateRange, setDateRange] = React.useState<DateRange | undefined>(parsedRange)
    const [presentEnabled, setPresentEnabled] = React.useState(parsedPresent)

    const handleSelect = (range: DateRange | undefined) => {
        setDateRange(range)
        setPresentEnabled(false)
        if (range?.from && range?.to) {
            onChange?.(`${format(range.from, "MMM yyyy")} - ${format(range.to, "MMM yyyy")}`)
        } else {
            onChange?.("")
        }
    }

    const handlePresentToggle = () => {
        const next = !presentEnabled
        setPresentEnabled(next)
        if (next && dateRange?.from) {
            // Clear the to date so calendar doesn't show a broken range
            setDateRange({ from: dateRange.from, to: undefined })
            onChange?.(`${format(dateRange.from, "MMM yyyy")} - ${PRESENT_LABEL}`)
        } else {
            onChange?.("")
        }
    }

    return (
        <Card className="w-full p-0">
            <CardContent className="p-1 w-full">
                <Calendar
                    mode="range"
                    className="w-full"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={handleSelect}
                    numberOfMonths={2}
                    disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                    }
                />

            </CardContent>
            {/* Present toggle row */}
            <div className="flex items-center justify-between px-3 pb-3 pt-1">
                <button
                    type="button"
                    onClick={handlePresentToggle}
                    disabled={!dateRange?.from}
                    className={`
              flex items-center gap-2 mt-2 text-sm rounded-md px-3 py-1.5 border transition-all
              ${presentEnabled
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background text-muted-foreground border-input hover:border-primary hover:text-foreground"
                        }
              disabled:opacity-40 disabled:cursor-not-allowed
            `}
                >
                    <span
                        className={`w-4 h-4 rounded-sm border flex items-center justify-center flex-shrink-0 transition-colors ${presentEnabled ? "bg-primary-foreground border-primary-foreground" : "border-current"
                            }`}
                    >
                        {presentEnabled && (
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path
                                    d="M1.5 5L4 7.5L8.5 2.5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-primary"
                                />
                            </svg>
                        )}
                    </span>
                    End date is <span className="font-medium">Present</span>
                </button>

                {/* Live preview */}
                {dateRange?.from && (
                    <span className="text-xs text-muted-foreground tabular-nums">
                        {format(dateRange.from, "MMM yyyy")}
                        {" → "}
                        {presentEnabled ? (
                            <span className="text-foreground font-medium">Present</span>
                        ) : dateRange.to ? (
                            format(dateRange.to, "MMM yyyy")
                        ) : (
                            <span className="italic">select end</span>
                        )}
                    </span>
                )}
            </div>
        </Card>
    )
}