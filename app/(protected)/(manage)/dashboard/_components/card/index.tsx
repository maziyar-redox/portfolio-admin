"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

export function ItemWrapper({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Card className="w-full">
            <CardHeader className=" font-semibold text-white text-lg">
                Manage your account
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
                {children}
            </CardContent>
        </Card>
    );
};