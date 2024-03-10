"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import { HiOutlineExclamationTriangle } from "react-icons/hi2";

interface ErrorProps {
    message: string;
};

export function ErrorMessage({
    message
}: ErrorProps) {
    return (
        <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 items-center text-center">
                    <HiOutlineExclamationTriangle className="h-20 w-20 text-red-600" />
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Oh wait!
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        {message}
                    </p>
                </div>
                <Button asChild>
                    <Link href="/auth/login">
                        Back to login ?
                    </Link>
                </Button>
            </div>
        </div>
    );
};