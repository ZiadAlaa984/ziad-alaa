"use client"

import Lottie from "lottie-react"
import animationData from "../../public/Hello.json"

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] overflow-hidden flex items-center justify-center bg-white">
            <Lottie
                animationData={animationData}
                loop
                className="w-60 h-60"
            />
        </div>
    )
}