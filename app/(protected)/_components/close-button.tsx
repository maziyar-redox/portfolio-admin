"use client";

import { cn } from "@/lib/utils";

import { useClosed } from "@/store/use-closed";

import { useMediaQuery } from "usehooks-ts";

import { CgMenuLeft } from "react-icons/cg";
import { RiCloseFill } from "react-icons/ri";

export function CloseButton() {
    const matches = useMediaQuery('(max-width: 768px)');
    const {
        closed,
        onColapse,
        onExpand
    } = useClosed((state) => state);
    return (
        <>
            <div className={cn(
                matches ? "fixed z-50" : "hidden",
                closed ? "left-5 top-7" : "left-5 top-5"
            )}>
                {closed && (
                    <button onClick={() => onExpand()}>
                        <CgMenuLeft className="w-7 h-7" />
                    </button>
                )}
                {!closed && (
                    <button onClick={() => onColapse()}>
                        <RiCloseFill className="w-9 h-9" />
                    </button>
                )}
            </div>
        </>
    );
};