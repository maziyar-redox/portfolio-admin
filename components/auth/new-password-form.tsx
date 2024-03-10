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

import { NewPasswordSchema } from "@/schema";

import { newPassword } from "@/actions/new-password";

import { useSearchParams } from "next/navigation";

export function NewPassowrdForm() {
    const params = useSearchParams();
    const token = params.get("token");
    const [success, setSuccess] = useState<string | undefined>("");
    const [error, setError] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: ""
        },
    });
    async function onSubmit(values: z.infer<typeof NewPasswordSchema>) {
        setError("");
        setSuccess("");
        startTransition(() => {
            newPassword(values, token as string)
                .then((data) => {
                    if (data.error) {
                        setError(data.error);
                    };
                    if (data.success) {
                        setSuccess(data.success);
                    };
                }).catch(() => setError("Something went wrong"));
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
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="password">
                                            New Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                id="password"
                                                placeholder="******"
                                                type="password"
                                                autoCapitalize="none"
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
                            Reset your password
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};