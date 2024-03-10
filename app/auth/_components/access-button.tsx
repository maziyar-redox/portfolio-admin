"use client";

import { usePathname } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import Link from "next/link";

interface AccessButtonProps {
    text: string;
    href: string;
};

export function AccessButton({
    text,
    href
}: AccessButtonProps) {
    const pathname = usePathname();
    if (href === pathname) return null;
    return (
        <Link
            href={href}
            className={cn(
                buttonVariants({ variant: "ghost" }),
                "absolute right-4 top-4 md:right-8 md:top-8"
            )}
        >
            {text}
        </Link>
    );
};