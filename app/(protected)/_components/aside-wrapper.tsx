"use client";

import { cn } from "@/lib/utils";

import { useClosed } from "@/store/use-closed";

import { useMediaQuery } from "usehooks-ts";

export function AsideWrapper({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    const matches = useMediaQuery('(max-width: 768px)');
    const {
        closed,
    } = useClosed((state) => state);
    return (
        <div className={cn(
            "duration-200 transition-all fixed top-0 bottom-0 z-20 bg-background",
            closed && matches ? "-left-full" : "left-0"
        )}>
            {children}
        </div>
    );
};