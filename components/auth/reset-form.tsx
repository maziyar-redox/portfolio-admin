"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { useState, useTransition } from "react";

import * as z from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { FormError, FormSuccess } from "@/components/auth/form-states";

import { SpinnerIcon } from "@/components/svg/spinner";

import { ResetSchema } from "@/schema";

import { resetPassword } from "@/actions/reset";

export function ResetForm() {
    const [success, setSuccess] = useState<string | undefined>("");
    const [error, setError] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: ""
        },
    });
    async function onSubmit(values: z.infer<typeof ResetSchema>) {
        setError("");
        setSuccess("");
        startTransition(() => {
            resetPassword(values)
                .then((data) => {
                    if (data.error) {
                        setError(data.error);
                    };
                    if (data.success) {
                        setSuccess(data.success);
                    };
                }).catch(() => setError("Something went wrong!"));
        });
    };
    return (
        <div className="grid gap-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-2">
                        <div className="grid gap-1">
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
                                                id="email"
                                                placeholder="name@example.com"
                                                type="email"
                                                autoCapitalize="none"
                                                autoComplete="email"
                                                autoCorrect="off"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormSuccess message={success} />
                        <FormError message={error} />
                        <Button disabled={isPending}>
                            {isPending && (
                                <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Send reset email
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};