"use client"

import * as React from "react"
import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
    useComboboxAnchor,
} from "@/components/ui/combobox"

const Technologies = [
    "Next.js",
    "TypeScript",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "Shadcn",
    "Supabase",
    "Tailwind CSS",
    "CSS",
    "HTML",
    "JavaScript",
    "Bootstrap",
    "Webflow",
    "Git",
    "Figma",
] as const

type Technology = (typeof Technologies)[number]

interface MultiSelectProps {
    value?: string[]
    onChange?: (value: string[]) => void
}

function MultiSelect({ value, onChange }: MultiSelectProps) {
    const anchor = useComboboxAnchor()

    return (
        <Combobox
            multiple
            autoHighlight
            items={Technologies}
            value={value}
            onValueChange={onChange}
        >
            <ComboboxChips ref={anchor} className="w-full">
                <ComboboxValue>
                    {(values: string[]) => (
                        <React.Fragment>
                            {values.map((v) => (
                                <ComboboxChip key={v}>{v}</ComboboxChip>
                            ))}
                            <ComboboxChipsInput placeholder="Search technologies..." />
                        </React.Fragment>
                    )}
                </ComboboxValue>
            </ComboboxChips>
            <ComboboxContent anchor={anchor}>
                <ComboboxEmpty>No technologies found.</ComboboxEmpty>
                <ComboboxList>
                    {(item: Technology) => (
                        <ComboboxItem key={item} value={item}>
                            {item}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    )
}

export default MultiSelect