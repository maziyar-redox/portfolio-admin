"use client";

import { Button } from "@/components/ui/button";

import { useSelected } from "@/store/use-selected";

import { cn } from "@/lib/utils";

import Link from "next/link";



type ItemListProps = {
    Data: {
        id: number;
        text: string;
        href: string;
        icon: JSX.Element;
    }[];
};

export function ItemList({
    Data
}: ItemListProps) {
    const {
        selected,
        onSelect
    } = useSelected((state) => state);
    return (
        <>
            {Data.map((items) => (
                <div key={items.id} className="group relative w-full pl-8">
                    <div className={cn(
                        "w-2 rounded-lg bg-white absolute -left-full top-0 bottom-0 transition-all duration-300 ease-in-out",
                        selected === items.href ? "-left-1" : "group-hover:-left-1"
                    )} />
                    <Button variant={
                        items.href === selected ? "navigation" : "default"
                    } className="flex justify-start items-center gap-x-4 py-5 w-full" asChild>
                        <Link href={items.href}>
                            {items.icon}
                            <h1 className="font-medium text-sm">
                                {items.text}
                            </h1>
                        </Link>
                    </Button>
                </div>
            ))}
        </>
    );
};