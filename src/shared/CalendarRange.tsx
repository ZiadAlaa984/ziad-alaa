// components/CalendarRange.tsx
"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { type DateRange } from "react-day-picker"
import { format } from "date-fns"

interface CalendarRangeProps {
    value?: string
    onChange?: (value: string) => void
}

export function CalendarRange({ value, onChange }: CalendarRangeProps) {

    // parse the string value back to DateRange for display
    const parseValue = (val?: string): DateRange | undefined => {
        if (!val) return undefined
        const parts = val.split(" - ")
        if (parts.length !== 2) return undefined
        const from = new Date(parts[0])
        const to = new Date(parts[1])
        if (isNaN(from.getTime()) || isNaN(to.getTime())) return undefined
        return { from, to }
    }

    const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
        parseValue(value)
    )

    const handleSelect = (range: DateRange | undefined) => {
        setDateRange(range)
        if (range?.from && range?.to) {
            // format as "Jan 2024 - May 2024"
            const formatted = `${format(range.from, "MMM yyyy")} - ${format(range.to, "MMM yyyy")}`
            onChange?.(formatted)
        } else {
            onChange?.("")
        }
    }

    return (
        <Card className=" w-full p-0">
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
        </Card>
    )
}