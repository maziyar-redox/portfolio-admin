"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import * as z from "zod";

import { AccountDetailSchema } from "@/schema";

import { UserRole } from "@prisma/client";

import { accountDetails } from "@/actions/account-details";

import { useTransition } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";

import { SpinnerIcon } from "@/components/svg/spinner";

interface AccountDetailsProps {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
};

export function AccountDetails({
    firstName,
    lastName,
    email,
    role
}: AccountDetailsProps) {
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof AccountDetailSchema>>({
        resolver: zodResolver(AccountDetailSchema),
        defaultValues: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            type: role as UserRole
        },
    });
    async function onSubmit(values: z.infer<typeof AccountDetailSchema>) {
        startTransition(() => {
            accountDetails(values)
                .then((data) => {
                    if (data.error) {
                        toast.error(data.error);
                    };
                    if (data.success) {
                        toast.success(data.success);
                    };
                }).catch(() => toast.error("Something went wrong"));
        });
    };
    return (
        <Card className="lg:col-span-2 col-span-4">
            <CardHeader>
                <CardTitle className="font-medium text-white text-lg">
                    Account Details
                </CardTitle>
                <CardDescription className="font-light">
                    Change your account details in here
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="grid gap-6">
                        <div className="flex justify-between items-center gap-x-5">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="firstName">
                                            First name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                id="firstName"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="lastName">
                                            Last name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                id="lastName"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="email">
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            id="email"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={
                            firstName === form.getValues().firstName
                            &&
                            lastName === form.getValues().lastName
                            &&
                            email === form.getValues().email
                            &&
                            role === form.getValues().type
                        } variant="outline" className="w-full">
                            {isPending && (
                                <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Submit changes
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
};