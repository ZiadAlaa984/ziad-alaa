// components/ui/ImageUpload.tsx
"use client"

import { Button } from "@/components/ui/button"
import Dropzone from "react-dropzone"
import { ImageIcon, XCircleIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface ImageUploadProps {
    value: File | string | null
    onChange: (file: File | null) => void
    size?: number // size in px, default 128
    className?: string
}

function ImageUpload({ value, onChange, size = 128, className }: ImageUploadProps) {
    return (
        <div className={className}>
            {value ? (
                <div style={{ width: size, height: size }} className="relative">
                    <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => onChange(null)}
                        className="absolute -top-2 -right-2 z-10"
                    >
                        <XCircleIcon className="h-5 w-5 text-white" />
                    </Button>
                    <Image
                        width={size}
                        height={size}
                        src={
                            typeof value === "string"
                                ? value
                                : URL.createObjectURL(value)
                        }
                        alt="uploaded"
                        className="rounded-full h-full w-full object-cover border"
                    />
                </div>
            ) : (
                <Dropzone
                    accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"] }}
                    maxFiles={1}
                    onDrop={(acceptedFiles) => {
                        const file = acceptedFiles[0]
                        if (file) onChange(file)
                    }}
                >
                    {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                        <div
                            {...getRootProps()}
                            style={{ width: size, height: size }}
                            className={cn(
                                "flex items-center justify-center rounded-full border-2 border-dashed cursor-pointer transition",
                                {
                                    "border-primary bg-primary/10": isDragActive,
                                    "border-destructive bg-destructive/10": isDragReject,
                                }
                            )}
                        >
                            <input {...getInputProps()} />
                            <ImageIcon className="h-10 w-10 opacity-50" />
                        </div>
                    )}
                </Dropzone>
            )}
        </div>
    )
}

export default ImageUpload