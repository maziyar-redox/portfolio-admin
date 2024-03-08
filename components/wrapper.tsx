"use client";

/* HOOKS */
import { useIsClient } from "usehooks-ts";

/* COMPONENTS */
import { LoadingState } from "@/components/loading-page";

export function LayoutWrapper({
    children
}: {
    children: React.ReactNode;
}) {
    const isClient = useIsClient();
    if (!isClient) {
        return (
            <LoadingState />
        );
    };
    return (
        <>
            {children}
        </>
    );
};